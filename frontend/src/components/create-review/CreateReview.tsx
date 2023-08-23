import React, { useContext, useState } from "react";
import styles from "./CreateReview.module.scss";
import AuthContext from "../../context/AuthProvider";
import { createReview } from "../../services/review";
import Cookies from "js-cookie";
import StarRating from "../form/star-rating/StarRating";
function CreateReview() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [visitedOn, setVisitedOn] = useState<Date | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const { authState } = useContext(AuthContext);
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    // const error = invalidForm();
    // if (error) {
    //   setErrMsg(error);

    //   resetForm();
    //   return;
    // }
    try {
      submitRequest();
      return true;
    } catch (e: any) {
      alert(e.message);
      setErrMsg("Something went wrong. Please try again later.");

      // resetForm();
    }
    return;
  }

  async function submitRequest() {
    try {
      const user = authState.userInfo;
      const jwt = Cookies.get("jwt");
      if (!jwt) return;
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
      console.log(review);
      setErrMsg("");
    } catch (e: any) {
      setErrMsg(e.response.data.message);
      // resetForm();
    }
  }

  // function invalidForm() {
  //   if (!email || !password) {
  //     return "Please fill out all fields";
  //   }
  // }

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
        <div className={styles["input-pairs"]}>
          <div className={styles["input-box"]}>
            <label>Name of Cafe / Restaurant / Hawker:</label>
            <input onChange={(e) => setName(e.target.value)} />
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
            <label>Price:</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <div className={styles["input-box"]}>
          <label>Visited on:</label>
          <input onChange={(e) => setVisitedOn(e.target.valueAsDate)} />
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
