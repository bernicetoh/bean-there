import React from "react";
import styles from "./Toaster.module.scss";

interface Props {
  text: string;
  colour: string;
}
export const Toaster = ({ text, colour }: Props) => {
  return (
    <div className={styles["toaster"]} style={{ backgroundColor: colour }}>
      <div className={styles["text"]}>{text}</div>
    </div>
  );
};
