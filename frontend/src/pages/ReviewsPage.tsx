import React, { useEffect, useState } from "react";
import { Review } from "../models/review.model";
import { getAllReviews } from "../services/review";
import ReviewPost from "../components/reviews-page/ReviewPost";
import styles from "./ReviewsPage.module.scss";
function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllReviews();
      setAllReviews(res);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.reviewsScreen}>
      <div className={styles.reviewsContent}>
        <div className={styles.header}>Bean There</div>
        {allReviews && (
          <div className={styles.reviewsContainer}>
            {allReviews.map((review) => (
              <ReviewPost review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
