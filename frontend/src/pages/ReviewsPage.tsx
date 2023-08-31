import React, { useEffect, useState } from "react";
import { Review } from "../models/review.model";
import { getAllReviews } from "../services/review";
import ReviewPost from "../components/reviews-page/ReviewPost";
import styles from "./ReviewsPage.module.scss";
import chevronDown from "../assets/chevron-down.svg";
import create from "../assets/add.svg";
import searchLogo from "../assets/search.svg";
import { AnimatePresence, motion } from "framer-motion";
import CreateReview from "../components/create-review/CreateReview";
import Cookies from "js-cookie";
import SkeletonPost from "../components/skeletons/SkeletonPost";
function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState<string>("");
  const [shownReviews, setShownReviews] = useState<Review[]>([]);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      const res = await getAllReviews(search, abortController.signal);
      console.log(res);
      setAllReviews(res);
      setShownReviews(res);
    };
    fetchData();
  }, [isCreate]);

  const [isSortedByDate, setIsSortedByDate] = useState(true);
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const getSortedByCat = (arr: Review[], isDate: boolean, isAsc: boolean) => {
    if (isDate && isAsc) {
      return arr.sort((a, b) => {
        return (
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );
      });
    }
    if (isDate && !isAsc) {
      return arr.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    }
    if (!isDate && isAsc) {
      return arr.sort((a, b) => {
        return a.rating - b.rating;
      });
    } else {
      return arr.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value.replace(/[^\p{L}\p{N}\s]/gu, ""));
    setSearch(e.target.value);

    if (search.length > 0) {
      const newReviews = allReviews.filter((review) => {
        return review.title
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s]/gu, "")
          .replace(/ /g, "")
          .includes(
            e.target.value
              .toLowerCase()
              .replace(/[^\p{L}\p{N}\s]/gu, "")
              .replace(/ /g, "")
          );
      });
      console.log(newReviews);
      setShownReviews(newReviews);
    } else {
      setShownReviews(allReviews);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <div className={styles.reviewsScreen}>
        <div className={styles.reviewsContent}>
          <div className={styles["header"]}>
            <h1>All Reviews</h1>
            <p>
              Discover the perfect cup through insights and recommendations from
              our community.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: "0px 50px",
              gap: "10px",
              width: "40%",
              alignSelf: "center",
            }}
          >
            {Cookies.get("token") && (
              <button
                onClick={() => setIsCreate(!isCreate)}
                className={`${styles["create-btn"]}  ${
                  isCreate ? styles["active"] : ""
                }`}
              >
                <img src={create} alt="create" />
              </button>
            )}
            <div className={styles["searchBar"]}>
              <input
                className={styles["searchBar-input"]}
                value={search}
                onChange={handleChange}
                placeholder="Search for a title"
              ></input>
              <img src={searchLogo} alt="search" />
            </div>
            <div className={styles["sortBtns"]}>
              <button
                className={styles["sortcat"]}
                onClick={() => setIsSortedByDate(!isSortedByDate)}
              >
                {isSortedByDate ? "Date" : "Rating"}
              </button>
              <button
                className={styles["chevron"]}
                onClick={() => setIsSortedAsc(!isSortedAsc)}
              >
                <img
                  src={chevronDown}
                  alt="chevron"
                  style={{
                    transform: isSortedAsc ? "scaleY(-1)" : "",
                    transition: "transform 150ms ease",
                  }}
                />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {allReviews && !isCreate && (
              <div
                className={styles.reviewsContainer}
                style={
                  allReviews.length === 0 || !allReviews
                    ? { display: "none" }
                    : {}
                }
              >
                <div className={styles["reviews-container-screen"]}>
                  {getSortedByCat(
                    shownReviews,
                    isSortedByDate,
                    isSortedAsc
                  ).map((review) => (
                    <ReviewPost review={review} />
                  ))}
                </div>
              </div>
            )}
            {(!allReviews && !isCreate) ||
              (allReviews.length === 0 && (
                <div className={styles.reviewsContainer}>
                  <div className={styles["reviews-container-screen"]}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SkeletonPost key={n} />
                    ))}
                  </div>
                </div>
              ))}

            {isCreate && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.1 }}
                style={{ height: "100%" }}
              >
                <CreateReview setIsCreate={setIsCreate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewsPage;
