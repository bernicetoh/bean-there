import { Review } from "../../models/review.model";
import styles from "./ReviewPost.module.scss";
import star from "../../assets/star.svg";
import coffeeImg from "../../assets/coffee.png";
import { convertDate } from "../../utils/formattings";
interface Props {
  review: Review;
}
function ReviewPost({ review }: Props) {
  return (
    <div className={styles.postContainer} key={review.id}>
      <div className={styles.img}>
        <img src={coffeeImg} alt="coffee" />
      </div>
      <div className={styles.details}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.reviewName}>{review.name}</div>
          <div className={styles.reviewRating}>
            {review.rating}
            <img src={star} alt="star" />
          </div>
        </div>
        <div className={styles.username}>Username1234</div>
        <div className={styles.date}>{convertDate(review.createdAt)}</div>
      </div>
    </div>
  );
}

export default ReviewPost;
