import React, { useEffect, useState } from "react";
import styles from "../average-rating/AverageRatings.module.scss";
import { RatingByLocation } from "../../../models/review.model";
import { sortCoordsByNearest } from "../../../utils/location";
import { getBestRatedLocations } from "../../../services/review";
import axios from "axios";
import config from "../../../config/config";
import { getAddressFromCoords } from "../../../services/location";
import Star from "../../star/Star";
import SkeletonElement from "../../skeletons/SkeletonElement";
import SkeletonArticle from "../../skeletons/SkeletonArticle";
interface Props {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
}
// returns the best ratings (above 4 stars) nearest to user
function BestRatings({ userLocation }: Props) {
  console.log("userLocation", userLocation);
  const [ratings, setRatings] = useState<RatingByLocation[]>();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const getBestRatedNearest = async () => {
      const res = await getBestRatedLocations();
      setRatings(res);
    };
    getBestRatedNearest();
  }, []);

  useEffect(() => {
    if (!ratings || !userLocation) return;
    setRatings(
      sortCoordsByNearest(ratings, [
        userLocation.latitude,
        userLocation.longitude,
      ])
    );
  }, [userLocation]);

  useEffect(() => {
    const getAddress = async () => {
      if (!userLocation) return;
      const address = await getAddressFromCoords(
        userLocation.latitude,
        userLocation.longitude
      );
      setUserAddress(address);
    };
    getAddress();
  }, [userLocation]);

  return (
    <div className={styles["best-rating"]}>
      <div className={styles["header"]}>Best rated near You</div>
      <div className={styles["user-location"]}>
        <div>
          <div>Your location:</div>
          {userAddress}
        </div>
      </div>
      {ratings && (
        <div className={styles["ratings-div"]}>
          {ratings.map((r) => (
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
      {!ratings && [1, 2, 3, 4].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}

export default BestRatings;
