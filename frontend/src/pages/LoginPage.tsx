import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, login } from "../services/authentication";

import AuthContext from "../context/AuthProvider";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
interface Props {
  setMode: Dispatch<SetStateAction<string>>;
}
function LoginPage({ setMode }: Props) {
  const navigate = useNavigate();
  const { setAuthState, authState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await login(email, password);
      const token = res.data.token;
      console.log(token);

      const user = await getCurrentUser(token);
      Cookies.set("token", token, {
        expires: 7,
      });
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage);
      setErrMsg("");
      navigate("/");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      // resetForm();
    }
  }

  function invalidForm() {
    if (!email || !password) {
      return "Please fill out all fields";
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className={styles["right-container"]}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      >
        <div className={styles["header"]}>
          <h1>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>

        <form
          className={styles["form"]}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button type="submit" className={styles["login"]}>
            Log in
          </button>
          <p className={styles["error"]}>{errMsg}</p>
        </form>
        <div className={styles["no-acc"]}>
          <p>Don't have an account?</p>
          <button
            className={styles["signup-link"]}
            onClick={() => setMode("Register")}
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
