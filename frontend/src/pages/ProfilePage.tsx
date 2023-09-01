import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { UserDetails } from "../models/user.model";
import { motion } from "framer-motion";
import ProfileForm from "../components/profile/ProfileForm";
const tabs = ["Profile", "Password"];

function ProfilePage() {
  const [user, setUser] = useState<UserDetails>();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    const getUserFromLocal = () => {
      const userStringify = localStorage.getItem("user");
      if (!userStringify) {
        return;
      } else {
        const user = JSON.parse(userStringify);
        setUser(user);
      }
    };
    getUserFromLocal();
  }, [isChanged]);

  return (
    <div className={styles["profile"]}>
      <div className={styles["profile-content"]}>
        <div className={styles["profile-card"]}>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%" }}
          >
            {selectedTab && user ? (
              <ProfileForm setMode={setSelectedTab} mode={selectedTab} />
            ) : (
              "Hmm"
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
