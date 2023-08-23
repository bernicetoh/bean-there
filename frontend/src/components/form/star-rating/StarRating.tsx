import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./StarRating.module.scss";

interface Props {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

function StarRating({ rating, setRating }: Props) {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className={styles["rating-container"]}>
      <div style={styles["stars"]}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={`${
                (hoverValue || rating) > index ? "#D89B00" : "#a9a9a9"
              }`}
              style={{
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
