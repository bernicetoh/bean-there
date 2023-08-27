import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, login } from "../services/authentication";
import logo from "../assets/bean-logo.svg";
import beanWhite from "../assets/bean-white.svg";
import beanBrown from "../assets/bean-brown.svg";
import AuthContext from "../context/AuthProvider";
import { UserDetails } from "../models/user.model";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
function LoginPage() {
  const navigate = useNavigate();
  const { setAuthState, authState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const brownBean = useRef<HTMLDivElement>(null);
  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({
      x: 0,
      y: 0,
    });

    React.useEffect(() => {
      const updateMousePosition = (ev: any) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };

      window.addEventListener("mousemove", updateMousePosition);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
      };
    }, []);

    return mousePosition;
  };

  const mousePosition = useMousePosition();
  useEffect(() => {
    if (!brownBean.current) return;
    brownBean.current.style.transform = `translateY${mousePosition.y} translateX${mousePosition.x}`;
  }, [mousePosition]);

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
      setAuthState({ userInfo: user, loggedIn: true, jwt: token });
      Cookies.set("token", token, {
        expires: 7,
      });
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage);
      setErrMsg("");
      navigate("/home");
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
    <div className={styles["loginscreen"]}>
      <div className={styles["login-content"]}>
        <div className={styles["login-card"]}>
          <div className={styles["left-container"]}>
            <img src={beanWhite} alt="bean white" id="bean-logo" />
            <div
              ref={brownBean}
              style={{
                top: `${mousePosition.y}px`,
                left: `${mousePosition.x}px`,
                position: "relative",
              }}
            >
              {/* <img src={beanBrown} alt="bean white" id="bean-logo" /> */}
            </div>

            <div style={{ color: "black" }}>
              {JSON.stringify(mousePosition)}
            </div>
          </div>

          <div className={styles["right-container"]}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%", width: "100%" }}
            >
              <div className={styles["header"]}>
                <img src={logo} alt="logo" className={styles["logo"]} />
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
                <Link to="/signup" className={styles["signup-link"]}>
                  Sign up
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
