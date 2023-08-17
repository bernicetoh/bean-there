import React, { useState } from "react";
import styles from "./TopBar.module.scss";
import logo from "../../assets/logo.svg";
import chevronDown from "../../assets/chevron-down.svg";
import { motion } from "framer-motion";
interface Props {
  selectedTab: string;
  isLoggedIn: boolean;
}

const tabs = ["Recent", "Locate", "Coffee Type"];
function TopBar({ isLoggedIn }: Props) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.logoImg}>
        <img src={logo} alt="logo" />
      </div>
      {/* <div className={styles.tabBar}>
        <div className={styles.recent}>
          <div className={styles.tabText}>Recent</div>
        </div>
        <div className={styles.location}>
          <div className={styles.tabText}>Location</div>
          <img src={chevronDown} alt="down" />
        </div>
        <div className={styles.coffeeType}>
          <div className={styles.tabText}>Coffee Type</div>
          <img src={chevronDown} alt="down" />
        </div>
      </div> */}
      <div className={styles.tabBar}>
        {tabs.map((item) => (
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
                layoutId="active-pill"
                style={{
                  backgroundColor: "#977c5a",
                  position: "absolute",
                  inset: 0,
                  borderRadius: 20,
                  // height: 45,
                }}
              />
            )}

            <span style={{ position: "relative", zIndex: "10" }}>{item}</span>
          </button>
        ))}
      </div>
      {isLoggedIn && <div></div>}
      {!isLoggedIn && (
        <div className={styles.authContainer}>
          <div className={styles.login}>Log in</div>
          <div className={styles.signup}>Sign up</div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
