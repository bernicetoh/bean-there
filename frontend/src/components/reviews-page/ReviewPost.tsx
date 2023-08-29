import { Review } from "../../models/review.model";
import styles from "./ReviewPost.module.scss";
import star from "../../assets/star.svg";
import coffeeImg from "../../assets/coffee.png";
import { convertDate } from "../../utils/formattings";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface Props {
  review: Review;
}
function ReviewPost({ review }: Props) {
  const location = useLocation();

  return (
    <Link
      to={`/reviews/${review.id}`}
      className={styles.postContainer}
      key={review.id}
      state={{ previousLocation: location }}
      // onClick={() => navigate(`/review/${review.id}`)}
    >
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
          <div className={styles.reviewName}>{review.title}</div>
          <div className={styles.reviewRating}>
            {review.rating}
            <img src={star} alt="star" />
          </div>
        </div>
        <div className={styles.username}>{review.user.username}</div>
        <div className={styles.date}>{convertDate(review.createdAt)}</div>
      </div>
    </Link>
  );
}

export default ReviewPost;
