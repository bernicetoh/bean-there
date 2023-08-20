import React, { useState } from "react";
import styles from "./AuthenticatedPage.module.scss";
import TopBar from "../components/top-bar/TopBar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import AuthForm from "../components/AuthForm";
export enum AuthMode {
  HOME = "Home",
  REVIEWS = "Reviews",
  LOCATE = "Locate",
}
const tabs = Object.values(AuthMode);

function AuthenticatedPage() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div>
      <TopBar
        isLoggedIn={false}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        tabs={tabs}
      />
      <AnimatePresence>
        <motion.div
          key={selectedTab ? selectedTab : "empty"}
          initial={{ x: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={
            selectedTab === tabs[0]
              ? { x: -10, opacity: 0 }
              : { x: 10, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          style={{ height: "100%" }}
        >
          {selectedTab ? (
            <AuthForm mode={selectedTab} />
          ) : (
            "Hmmmm looks like this isn't available right now. Please try again later!😋"
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AuthenticatedPage;
