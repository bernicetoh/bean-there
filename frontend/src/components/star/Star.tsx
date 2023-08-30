import { FaStar } from "react-icons/fa";
import styles from "./Star.module.scss";

interface Props {
  rating: number;
}

function Star({ rating }: Props) {
  const stars = Array(5).fill(0);

  return (
    <div className={styles["rating-container"]}>
      <div style={styles["stars"]}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              color={`${rating > index ? "#D89B00" : "#a9a9a9"}`}
              style={{
                marginRight: "10px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Star;
