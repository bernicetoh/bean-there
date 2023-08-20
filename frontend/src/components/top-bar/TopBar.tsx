import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./TopBar.module.scss";
import logo from "../../assets/bean-logo.svg";
import chevronDown from "../../assets/chevron-down.svg";
import { motion } from "framer-motion";
import { AuthMode } from "../../pages/AuthenticatedPage";
import { Link } from "react-router-dom";
interface Props {
  isLoggedIn: boolean;
  setSelectedTab: Dispatch<SetStateAction<AuthMode>>;
  selectedTab: AuthMode;
  tabs: Array<AuthMode>;
}

function TopBar({ isLoggedIn, setSelectedTab, selectedTab, tabs }: Props) {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.logoImg}>
        <img src={logo} alt="logo" />
      </div>
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
              onClick={() => setSelectedTab(item)}
            >
              {item === selectedTab && (
                <motion.div
                  layoutId="underline"
                  style={{
                    borderBottom: "1.5px solid #704638",
                    // justifyContent: "center",
                    display: "flex",
                    // alignItems: "center",
                    // backgroundColor: "#977c5a",
                    position: "absolute",
                    inset: 0,
                    // borderRadius: 20,
                  }}
                />
              )}

              <span style={{ position: "relative", zIndex: "10" }}>{item}</span>
            </button>
          </div>
        ))}
      </div>
      {isLoggedIn && <div></div>}
      {!isLoggedIn && (
        <div className={styles.authContainer}>
          <Link to={"login"} className={styles.login}>
            <div>Log in</div>
          </Link>
          <Link to={"signup"} className={styles.signup}>
            <div>Sign up</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;
