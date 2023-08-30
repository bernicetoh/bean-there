import React from "react";
import styles from "./Skeleton.module.scss";
interface Props {
  type: string;
}
function SkeletonElement({ type }: Props) {
  return <div className={`${styles["skeleton"]} ${styles[type]}`}></div>;
}

export default SkeletonElement;
