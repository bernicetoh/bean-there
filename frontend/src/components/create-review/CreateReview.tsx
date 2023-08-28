import React, { useContext, useState } from "react";
import styles from "./CreateReview.module.scss";
import AuthContext from "../../context/AuthProvider";
import { createReview } from "../../services/review";
import Cookies from "js-cookie";
import StarRating from "../form/star-rating/StarRating";
import PriceRating from "../form/price/PriceRating";
import { useNavigate } from "react-router-dom";
function CreateReview() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("low");
  const [rating, setRating] = useState<number>(1);
  const [visitedOn, setVisitedOn] = useState<Date | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const { authState } = useContext(AuthContext);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      console.log("trying");
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
      if (!userStringify) return;
      const user = JSON.parse(userStringify);
      const jwt = Cookies.get("token");
      const review = await createReview(
        name,
        location,
        type,
        price,
        rating,
        desc,
        visitedOn,
        jwt,
        user._id
      );
      setErrMsg("");
      navigate("/reviews");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      resetForm();
    }
  }

  function resetForm() {
    setName("");
    setDesc("");
  }
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
            <label>Name of Cafe / Restaurant / Hawker:</label>
            <input onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className={styles["input-box"]}>
            <label>Location:</label>
            <input onChange={(e) => setLocation(e.target.value)} />
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
