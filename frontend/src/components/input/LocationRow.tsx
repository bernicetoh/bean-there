import React, { Dispatch, SetStateAction } from "react";
import { Location } from "../../models/location.model";
import styles from "./LocationSelectInput.module.scss";
interface Props {
  location: Location;
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
  setSearch: Dispatch<SetStateAction<string>>;
}
export const LocationRow = ({
  location,
  setSearch,
  setSelectedLocation,
}: Props) => {
  const search =
    location.properties.name + " " + location.properties.address_line2;

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log("handleSelect");
    setSearch(search);
    setSelectedLocation(location);
  };

  return (
    <div
      key={location.properties.place_id}
      className={styles["location-row"]}
      onClick={handleClick}
    >
      <div>{search}</div>
    </div>
  );
};
