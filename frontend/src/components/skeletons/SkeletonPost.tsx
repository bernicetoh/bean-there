import React from "react";
import styles from "./Skeleton.module.scss";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";
function SkeletonPost() {
  return (
    <div className={styles["skeleton-wrapper-post"]}>
      <div className={styles["skeleton-article"]}>
        <SkeletonElement type="image" />
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
}

export default SkeletonPost;
