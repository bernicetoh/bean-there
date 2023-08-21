import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { login } from "../services/authentication";
import logo from "../assets/bean-logo.svg";
import beanWhite from "../assets/bean-white.svg";
import beanBrown from "../assets/bean-brown.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
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
      const user = await login(email, password);
      console.log(user);
      setErrMsg("");
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
            <img src={beanBrown} alt="bean white" id="bean-logo" />
            <div>{JSON.stringify(mousePosition)}</div>
          </div>
          <div className={styles["right-container"]}>
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
                  type="text"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
