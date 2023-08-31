import React from "react";
import styles from "./Skeleton.module.scss";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";
function SkeletonLine() {
  return (
    <div className={styles["skeleton-wrapper-line"]}>
      <div className={styles["skeleton-article"]}>
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
}

export default SkeletonLine;
