import React, { useContext, useState } from "react";
import styles from "./SignupPage.module.scss";
import logo from "../assets/bean-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { UserRoles } from "../models/user.model";
import { getCurrentUser, signup } from "../services/authentication";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
function SignupPage() {
  const navigate = useNavigate();
  const { setAuthState, authState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<string>("");
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
      const res = await signup(
        name,
        email,
        password,
        repassword,
        username,
        "admin"
      );
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
      navigate("/home");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      // resetForm();
    }
  }

  function invalidForm() {
    if (!name || !email || !password || !repassword || !username || !role) {
      return "Please fill out all fields";
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRepassword("");
    setUsername("");
    setRole("");
  }
  return (
    <div className={styles["signupscreen"]}>
      <div className={styles["signup-content"]}>
        <div className={styles["signup-card"]}>
          <div className={styles["left-container"]}></div>
          <div className={styles["right-container"]}>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%" }}
            >
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

                <div className={styles["input-box"]}>
                  <label>Role</label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    id="role"
                  />
                </div>
                <button type="submit" className={styles["signup"]}>
                  Sign up
                </button>
                <p className={styles["error"]}>{errMsg}</p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
