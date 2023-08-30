import React, { useEffect, useState } from "react";
import styles from "./LocatePage.module.scss";
import AverageRatings from "../components/locate/average-rating/AverageRatings";
import BestRatings from "../components/locate/best-rating/BestRatings";
import { motion } from "framer-motion";
function LocatePage() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
      className={styles["locate"]}
    >
      <div className={styles["locate-content"]}>
        <div className={styles["avg-container"]}>
          <AverageRatings userLocation={userLocation} />
        </div>
        <div className={styles["best-container"]}>
          <BestRatings userLocation={userLocation} />
        </div>
      </div>
    </motion.div>
  );
}
export default LocatePage;

// need to implement a function that gets the average rating of all reviews with the same location and return them from nearest to user to  furthest

// need to implement a search function that gets the average rating of all reviews
