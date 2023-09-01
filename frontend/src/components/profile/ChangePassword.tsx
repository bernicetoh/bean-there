import React, { Dispatch, SetStateAction, useState } from "react";
import { UserDetails } from "../../models/user.model";
import styles from "./ChangePassword.module.scss";
import Cookies from "js-cookie";
import chevronDown from "../../assets/chevron-down.svg";
import { motion } from "framer-motion";
import {
  getCurrentUser,
  updateMyPassword,
} from "../../services/authentication";
interface Props {
  setMode: Dispatch<SetStateAction<string>>;
}
function ChangePassword({ setMode }: Props) {
  console.log(Cookies.get("token"));

  const [currPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsSubmitted(false);
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
      await updateMyPassword(currPassword, newPassword, repassword, token);
      const user = await getCurrentUser(token);
      localStorage.setItem("user", JSON.stringify(user));
      setErrMsg("");
      setIsSubmitted(true);
      console.log("sucessfully saved!");
    } catch (e: any) {
      console.log(e);
      setErrMsg(e.response.data.message);
    }
  }

  function invalidForm() {
    if (
      currPassword.length === 0 ||
      newPassword.length === 0 ||
      repassword.length === 0
    ) {
      return "You must enter all fields.";
    }
  }
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
        <button onClick={() => setMode("Profile")}>
          <img
            src={chevronDown}
            alt="back"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
        <h1>Authentication</h1>
      </div>
      <form className={styles["form"]} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles["input-box"]}>
          <label>Current Password</label>
          <input
            value={currPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>
        <div className={styles["input-box"]}>
          <label>New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            id="newPassword"
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
        <button className={styles["save"]} type="submit">
          Save changes
        </button>
        {!isSubmitted && <p className={styles["error"]}>{errMsg}</p>}
        {isSubmitted && (
          <p className={styles["success"]}>Changes saved successfully!</p>
        )}
      </form>
    </motion.div>
  );
}

export default ChangePassword;
