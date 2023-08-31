import React, { useEffect, useState } from "react";
import styles from "./AverageRatings.module.scss";
import { getAverageRatingByLocation } from "../../../services/review";
import { RatingByLocation, Review } from "../../../models/review.model";
import { sortCoordsByNearest } from "../../../utils/location";
import searchLogo from "../../../assets/search.svg";
import Star from "../../star/Star";
import SkeletonArticle from "../../skeletons/SkeletonArticle";
import chevronDown from "../../../assets/chevron-down.svg";
interface Props {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
}
function AverageRatings({ userLocation }: Props) {
  const [ratings, setRatings] = useState<RatingByLocation[]>();
  const [shownRatings, setShownRatings] = useState<RatingByLocation[]>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getAverageRatingsByLocation = async () => {
      const res = await getAverageRatingByLocation();
      setRatings(res);
      setShownRatings(res);
    };

    getAverageRatingsByLocation();
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value.replace(/[^\p{L}\p{N}\s]/gu, ""));
    setSearch(e.target.value);

    if (search.length > 0 && ratings) {
      const newRatings = ratings.filter((review) => {
        return review._id
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
      setShownRatings(newRatings);
    } else {
      setShownRatings(ratings);
    }
  };
  const [isSortedByRating, setIsSortedByRating] = useState(true);
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const getSortedByCat = (
    arr: RatingByLocation[],
    isRating: boolean,
    isAsc: boolean
  ) => {
    if (isRating && isAsc) {
      return arr.sort((a, b) => {
        return a.averageRating - b.averageRating;
      });
    }
    if (isRating && !isAsc) {
      return arr.sort((a, b) => {
        return b.averageRating - a.averageRating;
      });
    }
    if (!isRating && isAsc) {
      return arr.sort((a, b) => {
        return a.numReviews - b.numReviews;
      });
    } else {
      return arr.sort((a, b) => {
        return b.numReviews - a.numReviews;
      });
    }
  };

  // TODO: implement sort rating function (sort by num reviews, sort by rating)

  return (
    <div className={styles["avg-rating"]}>
      <div className={styles["header"]}>Locate a coffee spot</div>
      <div className={styles["bars"]}>
        <div className={styles["searchBar"]}>
          <input
            className={styles["searchBar-input"]}
            value={search}
            onChange={handleChange}
            placeholder="Search for a cafe / restuarant / hawker"
          ></input>
          <img src={searchLogo} alt="search" />
        </div>
        <div className={styles["sortBtns"]}>
          <button
            className={styles["sortcat"]}
            onClick={() => setIsSortedByRating(!isSortedByRating)}
          >
            {isSortedByRating ? "Rating" : "No. Reviews"}
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

      {shownRatings && (
        <div className={styles["ratings-div"]}>
          {getSortedByCat(shownRatings, isSortedByRating, isSortedAsc).map(
            (r) => (
              <div className={styles["rating-item"]}>
                <div className={styles["rating-name"]}>{r._id}</div>
                <div className={styles["rating-address"]}>
                  {r.locationAddress}
                </div>
                <div className={styles["rating"]}>
                  <div>Average rating:</div>
                  <Star rating={r.averageRating} />
                  <div>
                    {r.numReviews} {r.numReviews === 1 ? "Review" : "Reviews"}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {!shownRatings && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}

export default AverageRatings;
