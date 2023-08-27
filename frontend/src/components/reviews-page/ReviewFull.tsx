import React, { useEffect, useState } from "react";
import styles from "./ReviewFull.module.scss";
import { Link, useParams } from "react-router-dom";
import { getReviewById } from "../../services/review";
import { Review } from "../../models/review.model";
import { convertDate } from "../../utils/formattings";
import chevronDown from "../../assets/chevron-down.svg";
import star from "../../assets/star.svg";
import lungo from "../../assets/lungo.svg";
import dollar from "../../assets/dollar.svg";
function ReviewFull() {
  const { postId } = useParams();
  const [review, setReview] = useState<Review>();
  useEffect(() => {
    const getReview = async () => {
      if (!postId) return;
      const data = await getReviewById(postId);
      setReview(data);
      console.log(data);
    };
    getReview();
  }, [postId]);

  return (
    <div className={styles["reviewfull"]}>
      {review && (
        <div className={styles["review-container"]}>
          <div className={styles["left-container"]}>
            <div className={styles["left-container-content"]}>
              <Link to={"/reviews"} className={styles["back"]}>
                <img src={chevronDown} alt="back" />
              </Link>
              <div className={styles["review-details"]}>
                <div className={styles["name"]}>{review.name}</div>
                <div className={styles["location"]}>{review.location}</div>
                {review.visitedAt && (
                  <div>Visited on: {convertDate(review.visitedAt)}</div>
                )}
                <div>{review.description}</div>
              </div>
            </div>
          </div>
          <div className={styles["right-container"]}>
            <div className={styles["rating"]}>
              <img src={star} alt="star" />
              <div style={{ color: "grey" }}>Rating:</div>
              <div>{review.rating}/5</div>
            </div>

            <div className={styles["coffee"]}>
              <img src={lungo} alt="lungo" />
              <div>{review.coffeeType}</div>
            </div>
            <div className={styles["price"]}>
              {review.price === "low" && (
                <div className={styles["price-img"]}>
                  <img src={dollar} alt="dollar" />{" "}
                </div>
              )}
              {review.price === "medium" && (
                <div className={styles["price-img"]}>
                  <img src={dollar} alt="dollar" />{" "}
                  <img src={dollar} alt="dollar" />{" "}
                </div>
              )}
              {review.price === "high" && (
                <div className={styles["price-img"]}>
                  <img src={dollar} alt="dollar" />{" "}
                  <img src={dollar} alt="dollar" />{" "}
                  <img src={dollar} alt="dollar" />{" "}
                </div>
              )}
              <div>Price</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewFull;
