import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: ReactNode;
}
export function Modal({ children }: Props) {
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        style={{ height: "100%" }}
        exit={{ opacity: 0 }}
      >
        <div className={styles["modal-wrapper"]} onClick={() => navigate("/")}>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%" }}
            className={styles["modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
