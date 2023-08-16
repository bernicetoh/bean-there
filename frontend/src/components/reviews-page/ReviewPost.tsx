import React from "react";
import { Review } from "../../models/review.model";
import styles from "./ReviewPost.module.scss";
interface Props {
  review: Review;
}
function ReviewPost({ review }: Props) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.reviewName}>{review.name}</div>
      <div className={styles.reviewLocation}>Location: {review.location}</div>

      <div className={styles.reviewRating}>Rating: {review.rating}/5</div>
    </div>
  );
}

export default ReviewPost;
