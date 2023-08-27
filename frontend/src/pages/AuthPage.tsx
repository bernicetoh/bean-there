import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import styles from "./AuthPage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, login } from "../services/authentication";
import logo from "../assets/bean-logo.svg";
import beanWhite from "../assets/bean-white.svg";
import beanBrown from "../assets/bean-brown.svg";
import AuthContext from "../context/AuthProvider";
import { UserDetails } from "../models/user.model";
import Cookies from "js-cookie";
import { easeInOut, motion, useMotionValue, useTransform } from "framer-motion";
import AuthForm from "../components/AuthForm";

const tabs = ["Login", "Register"];

function AuthPage() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    location.state && location.state.isRegister ? tabs[1] : tabs[0]
  );

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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            >
              {selectedTab ? (
                <AuthForm setMode={setSelectedTab} mode={selectedTab} />
              ) : (
                "Hmm"
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
