import React from "react";
import styles from "./TopBar.module.scss";
import logo from "../../assets/logo.svg";
import chevronDown from "../../assets/chevron-down.svg";
interface Props {
  selectedTab: string;
  isLoggedIn: boolean;
}
function TopBar({ selectedTab, isLoggedIn }: Props) {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.logoImg}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.tabBar}>
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
