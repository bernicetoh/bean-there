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
import { easeInOut, motion, useMotionValue, useTransform } from "framer-motion";
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
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateXBrown = useTransform(y, [0, 400], [20, -20]);
  const rotateYBrown = useTransform(x, [0, 400], [-20, 20]);
  const rotateXWhite = useTransform(y, [0, 400], [45, -45]);
  const rotateYWhite = useTransform(x, [0, 400], [-45, 45]);

  function handleMouse(event: any) {
    // console.log(event);
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const boxRef1 = useRef<HTMLDivElement>(null);

  const isMouseInBound = (e: any) => {
    if (!boxRef1 || !boxRef1.current) return;
    const eleBounds = boxRef1.current.getBoundingClientRect();
    let ret = false;
    if (e.clientX >= eleBounds.left && e.clientX <= eleBounds.right) {
      ret = true;
    } else {
      ret = false;
    }
  };

  const resetPosition = (e: any) => {
    x.set(100);
    y.set(100);

    // e.currentTarget.transition = {""}
  };

  return (
    <div className={styles["loginscreen"]}>
      <div className={styles["login-content"]}>
        <div className={styles["login-card"]}>
          <div className={styles["left-container"]}>
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                placeItems: "center",
                placeContent: "center",
                borderRadius: 30,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                perspective: 400,
                position: "relative",
              }}
              onMouseEnter={isMouseInBound}
              onMouseLeave={resetPosition}
              onMouseMove={handleMouse}
              ref={boxRef1}
            >
              <motion.img
                src={beanBrown}
                className={styles["moving-img"]}
                // transition={{ ease: "linear", duration: 2 }}
                style={{
                  zIndex: 1,
                  width: 150,
                  height: 150,
                  rotateX: rotateXBrown,
                  rotateY: rotateYBrown,
                  position: "absolute",
                }}
              />
              <motion.img
                src={beanWhite}
                className={styles["moving-img"]}
                style={{
                  zIndex: 0,
                  width: 160,
                  height: 160,
                  left: 110,
                  rotateX: rotateXWhite,
                  rotateY: rotateYWhite,
                  position: "absolute",
                }}
              />
            </motion.div>
          </div>

          <div className={styles["right-container"]}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
