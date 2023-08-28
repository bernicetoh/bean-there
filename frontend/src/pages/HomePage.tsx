import { useState } from "react";
import CreateReview from "../components/create-review/CreateReview";
import { AnimatePresence, motion } from "framer-motion";
import mug from "../assets/coffee-mug.svg";
import styles from "./HomePage.module.scss";
import pot from "../assets/pot.svg";
import potStove from "../assets/pot-stove.svg";
function HomePage() {
  const [isCreate, setIsCreate] = useState(false);

  const potVariants = {
    offscreen: {
      rotate: 0,
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  const mugVariants = {
    offscreen: {
      rotate: 0,
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      rotate: 10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      style={{ height: "100%" }}
    >
      <div className={styles["home-content"]}>
        <div className={styles["header"]}>
          <div className={styles["header-text"]}>
            <div className={styles["header-title"]}>BeanThere</div>
            <div className={styles["header-desc"]}>
              Immerse yourself in a vibrant community of fellow coffee lovers,
              where you can exchange the best coffee spots, share your personal
              coffee experiences, and learn from each other's journeys.
            </div>
          </div>
          <motion.div
            className={styles["background"]}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.img
              src={mug}
              className={styles["moving-img"]}
              variants={mugVariants}
            />
            <div className={styles["pot-img"]}>
              <motion.img
                src={pot}
                className={styles["moving-img"]}
                variants={potVariants}
              />
              <img
                src={potStove}
                className={styles["static-img"]}
                alt="pot-stove"
              />
            </div>
          </motion.div>
        </div>

        <button onClick={() => setIsCreate(!isCreate)}>Create Review!</button>
        {isCreate && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.1 }}
              style={{ height: "100%" }}
            >
              <CreateReview />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

export default HomePage;
