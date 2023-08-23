import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "./TopBar.module.scss";
import logo from "../../assets/bean-outline.svg";
import chevronDown from "../../assets/chevron-down.svg";
import { motion } from "framer-motion";
import { AuthMode } from "../../pages/AuthenticatedPage";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
interface Props {
  setSelectedTab: Dispatch<SetStateAction<AuthMode>>;
  selectedTab: AuthMode;
  tabs: Array<AuthMode>;
}

function TopBar({ setSelectedTab, selectedTab, tabs }: Props) {
  const { authState } = useContext(AuthContext);
  const { loggedIn, userInfo } = authState;

  return (
    <div className={styles.topbarContainer}>
      <Link className={styles.logoImg} to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={styles.tabBar}>
        {tabs.map((item) => (
          <div className={styles["tab"]}>
            <button
              key={item}
              className={
                item === selectedTab
                  ? `${styles["selected"]} ${styles[item]}`
                  : styles["unselected"]
              }
              onClick={() => {
                setSelectedTab(item);
              }}
            >
              {item === selectedTab && (
                <motion.div
                  layoutId="underline"
                  style={{
                    borderBottom: "1.5px solid #704638",
                    // justifyContent: "center",
                    display: "flex",
                    width: "50%",
                    alignSelf: "center",
                    // alignItems: "center",
                    // backgroundColor: "#977c5a",
                    position: "absolute",
                    inset: 0,
                    margin: "0 auto",
                    // borderRadius: 20,
                  }}
                />
              )}

              <span style={{ position: "relative", zIndex: "10" }}>{item}</span>
            </button>
          </div>
        ))}
      </div>
      {true && (
        <div className={styles["profile"]}>
          <button>
            <p>bernicetoh</p>
          </button>
        </div>
      )}
      {false && (
        <div className={styles.authContainer}>
          <Link to={"login"} className={styles.login} target="_blank">
            <div>Log in</div>
          </Link>
          <Link to={"signup"} className={styles.signup} target="_blank">
            <div>Sign up</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;
