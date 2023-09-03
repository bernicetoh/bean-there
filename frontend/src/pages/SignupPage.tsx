import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "./SignupPage.module.scss";
import logo from "../assets/bean-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { UserRoles } from "../models/user.model";
import { getCurrentUser, signup } from "../services/authentication";
import chevronDown from "../assets/chevron-down.svg";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
interface Props {
  setMode: Dispatch<SetStateAction<string>>;
}
function SignupPage({ setMode }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setErrMsg(error);
      resetForm();
      return;
    }
    try {
      submitRequest();
      return true;
    } catch (e: any) {
      alert(e.message);
      setErrMsg("Something went wrong. Please try again later.");

      // resetForm();
    }
    return;
  }

  async function submitRequest() {
    try {
      const res = await signup(name, email, password, repassword, username);
      const token = res.data.token;
      console.log(token);
      Cookies.set("token", token, {
        expires: 7,
      });
      const user = await getCurrentUser(token);
      console.log(user);
      // setAuthState({ userInfo: user, loggedIn: true, });
      localStorage.setItem("user", JSON.stringify(user));
      setErrMsg("");
      navigate("/");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      // resetForm();
    }
  }

  function invalidForm() {
    if (!name || !email || !password || !repassword || !username) {
      return "Please fill out all fields";
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRepassword("");
    setUsername("");
  }
  return (
    <div className={styles["right-container"]}>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        style={{ height: "100%" }}
      >
        <button onClick={() => setMode("Login")}>
          <img
            src={chevronDown}
            alt="back"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
        <div className={styles["header"]}>
          <h1>Welcome!</h1>
          <p>Please enter your details</p>
        </div>

        <form
          className={styles["form"]}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
          <div className={styles["input-box"]}>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            />
          </div>
          <div className={styles["input-box"]}>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <div className={styles["input-box"]}>
            <label>Re-enter Password</label>
            <input
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              type="password"
              id="repassword"
            />
          </div>

          <button type="submit" className={styles["signup"]}>
            Sign up
          </button>
          <p className={styles["error"]}>{errMsg}</p>
        </form>
      </motion.div>
    </div>
  );
}

export default SignupPage;
