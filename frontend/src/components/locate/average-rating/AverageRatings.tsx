import React, { useEffect, useState } from "react";
import styles from "./AverageRatings.module.scss";
import { getAverageRatingByLocation } from "../../../services/review";
import { RatingByLocation } from "../../../models/review.model";
import { sortCoordsByNearest } from "../../../utils/location";
import searchLogo from "../../../assets/search.svg";
import Star from "../../star/Star";
import SkeletonArticle from "../../skeletons/SkeletonArticle";

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

  // TODO: implement sort rating function (sort by num reviews, sort by rating)

  return (
    <div className={styles["avg-rating"]}>
      <div className={styles["header"]}>Average rating of coffee spots</div>
      <div className={styles["searchBar"]}>
        <input
          className={styles["searchBar-input"]}
          value={search}
          onChange={handleChange}
          placeholder="Search for a coffee spot"
        ></input>
        <img src={searchLogo} alt="search" />
      </div>
      {shownRatings && (
        <div className={styles["ratings-div"]}>
          {shownRatings.map((r) => (
            <div className={styles["rating-item"]}>
              <div className={styles["rating-name"]}>{r._id}</div>
              <div className={styles["rating-address"]}>
                {r.locationAddress}
              </div>
              <div className={styles["rating"]}>
                <div>Average rating:</div>
                <Star rating={r.averageRating} />
                <div>{r.numReviews} Reviews</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!shownRatings && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}

export default AverageRatings;
