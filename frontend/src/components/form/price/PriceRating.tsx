import { Dispatch, SetStateAction, useState } from "react";
import { BiDollar } from "react-icons/bi";
import styles from "./PriceRating.module.scss";

interface Props {
  rating: string;
  setRating: Dispatch<SetStateAction<string>>;
}

function PriceRating({ rating, setRating }: Props) {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const prices = Array(3).fill(0);

  const handleClick = (value: number) => {
    if (value === 1) {
      setRating("low");
    } else if (value === 2) {
      setRating("medium");
    } else {
      setRating("high");
    }
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const getNumberEquivalent = (rating: string) => {
    if (rating === "low") {
      return 1;
    } else if (rating === "medium") {
      return 2;
    } else {
      return 3;
    }
  };
  return (
    <div className={styles["rating-container"]}>
      <div style={styles["stars"]}>
        {prices.map((_, index) => {
          return (
            <BiDollar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={`${
                (hoverValue || getNumberEquivalent(rating)) > index
                  ? "#D89B00"
                  : "#a9a9a9"
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

export default PriceRating;
