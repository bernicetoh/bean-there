import React from "react";
import { Review } from "../../models/review.model";
import styles from "./ReviewPost.module.scss";
import star from "../../assets/star.svg";
interface Props {
  review: Review;
}
function ReviewPost({ review }: Props) {
  return (
    <div className={styles.postContainer} key={review.id}>
      <div className={styles.details}>
        <div>
          <div className={styles.reviewName}>{review.name}</div>
          <div className={styles.reviewRating}>
            {review.rating}
            <img src={star} alt="star" />
          </div>
        </div>
        <div>{JSON.stringify(review.createdAt)}</div>
      </div>
    </div>
  );
}

export default ReviewPost;
