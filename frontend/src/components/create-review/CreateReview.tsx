import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CreateReview.module.scss";
import AuthContext from "../../context/AuthProvider";
import { createReview } from "../../services/review";
import Cookies from "js-cookie";
import StarRating from "../form/star-rating/StarRating";
import PriceRating from "../form/price/PriceRating";
import { useNavigate } from "react-router-dom";
import LocationSelectInput from "../input/LocationSelectInput";
import { Location } from "../../models/location.model";

interface Props {
  setIsCreate: Dispatch<SetStateAction<boolean>>;
}
function CreateReview({ setIsCreate }: Props) {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<Location | null>(null);
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("low");
  const [rating, setRating] = useState<number>(1);
  const [visitedOn, setVisitedOn] = useState<Date | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setErrMsg(error);
      return;
    }
    try {
      submitRequest();
      return true;
    } catch (e: any) {
      alert(e.message);
      setErrMsg("Something went wrong. Please try again later.");
    }
    return;
  }

  async function submitRequest() {
    try {
      const userStringify = localStorage.getItem("user");
      if (!userStringify || !location) return;
      const user = JSON.parse(userStringify);
      const jwt = Cookies.get("token");
      await createReview(
        title,
        [location.properties.lat, location.properties.lon],
        location.properties.name,
        location.properties.address_line2,
        type,
        price,
        rating,
        desc,
        visitedOn,
        jwt,
        user._id
      );
      setErrMsg("");
      setIsCreate(false);
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      resetForm();
    }
  }

  function resetForm() {
    setTitle("");
    setDesc("");
  }

  function invalidForm() {
    if (!location) return "Please select a location";
  }

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div className={styles["create-review"]}>
      <div className={styles["header"]}>
        <h1>Create a Coffee Review</h1>
      </div>
      <form
        className={styles["form"]}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <StarRating rating={rating} setRating={setRating} />
        <div className={styles["price-input-box"]}>
          <label>Price:</label>
          <PriceRating rating={price} setRating={setPrice} />
        </div>
        <div className={styles["input-pairs"]}>
          <div className={styles["input-box"]}>
            <label>Review title:</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className={styles["input-box"]}>
            <label>Location:</label>
            {/* <input onChange={(e) => setLocation(e.target.value)} /> */}
            <LocationSelectInput
              selectedLocation={location}
              setSelectedLocation={setLocation}
            />
          </div>
        </div>

        <div className={styles["input-pairs"]}>
          <div className={styles["input-box"]}>
            <label>Coffee Bought (e.g. Iced Latte):</label>
            <input onChange={(e) => setType(e.target.value)} />
          </div>
          <div className={styles["input-box"]}>
            <label>Visited on:</label>
            <input onChange={(e) => setVisitedOn(e.target.valueAsDate)} />
          </div>
        </div>

        <div className={styles["desc-input-box"]}>
          <label>Description:</label>
          <textarea onChange={(e) => setDesc(e.target.value)} />
        </div>
        <p style={{ color: "red" }}>{errMsg}</p>
        <button type="submit" className={styles["submit"]}>
          Submit review
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
