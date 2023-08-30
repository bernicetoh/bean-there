import React from "react";
import styles from "./Skeleton.module.scss";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";
function SkeletonArticle() {
  return (
    <div className={styles["skeleton-wrapper"]}>
      <div className={styles["skeleton-article"]}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
}

export default SkeletonArticle;
