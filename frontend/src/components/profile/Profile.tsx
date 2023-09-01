import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { UserDetails } from "../../models/user.model";
import { getCurrentUser, updateMe } from "../../services/authentication";
import Cookies from "js-cookie";
import chevronDown from "../../assets/chevron-down.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
interface Props {
  setMode: Dispatch<SetStateAction<string>>;
}
function Profile({ setMode }: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setErrMsg(error);
      return;
    }
    try {
      submitRequest();
      return true;
    } catch (e: any) {
      alert(e.message);
      setErrMsg("Something went wrong. Please try again later.");
    }
    return;
  }
  async function submitRequest() {
    try {
      const token = Cookies.get("token");
      console.log(token);
      if (!name || !email) return;
      await updateMe(name, email, token);
      const user = await getCurrentUser(token);
      localStorage.setItem("user", JSON.stringify(user));
      setErrMsg("");
      setIsSubmitted(true);
      console.log("sucessfully saved!");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
    }
  }

  function invalidForm() {
    if (!name || !email) {
      return "Name and Email must be provided";
    }
  }

  useEffect(() => {
    const getUser = () => {
      console.log("getting user");
      const userStringify = localStorage.getItem("user");
      if (!userStringify) {
        setUser(null);
        return;
      }
      const user: UserDetails = JSON.parse(userStringify);
      console.log(user);
      setUser(user);
      setEmail(user.email);
      setName(user.name);
    };
    getUser();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%" }}
      className={styles["container"]}
    >
      <div className={styles["header"]}>
        <button onClick={() => navigate("/home")}>
          <img
            src={chevronDown}
            alt="back"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
        <h1>Your Profile</h1>
      </div>
      {user && (
        <form className={styles["form"]} onSubmit={(e) => handleSubmit(e)}>
          <p>Role: {user.role}</p>

          <div className={styles["input-box"]}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
            />
          </div>
          <div className={styles["input-box"]}>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
            />
          </div>
          <button
            className={styles["save"]}
            type="submit"
            disabled={name === user.name && email === user.email}
          >
            Save changes
          </button>
          {!isSubmitted && <p className={styles["error"]}>{errMsg}</p>}
          {isSubmitted && (
            <p className={styles["success"]}>Changes saved successfully!</p>
          )}
        </form>
      )}
      <button
        onClick={() => setMode("Password")}
        className={styles["password"]}
      >
        Change password
      </button>
    </motion.div>
  );
}

export default Profile;
