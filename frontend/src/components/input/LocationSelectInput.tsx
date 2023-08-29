import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./LocationSelectInput.module.scss";
import axios from "axios";
import { Location } from "../../models/location.model";
import { LocationRow } from "./LocationRow";

interface Props {
  selectedLocation: Location | null;
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
}
export const LocationSelectInput = ({
  selectedLocation,
  setSelectedLocation,
}: Props) => {
  const [search, setSearch] = useState(
    selectedLocation
      ? `${selectedLocation.properties.name} ${selectedLocation.properties.address_line2}`
      : ""
  );

  const [autoComplete, setAutoComplete] = useState([]);

  useEffect(() => {
    const getAutocomplete = async () => {
      const config = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=d1068570901b47a79c31cdd05445a4e6`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          console.log(response.data.features);
          setAutoComplete(response.data.features);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getAutocomplete();
  }, [search]);

  const handleSelect = (location: Location) => {
    console.log("selected", location);
    setSearch(
      `${location.properties.name} ${location.properties.address_line2}`
    );
    setSelectedLocation(location);
  };

  return (
    <div className={styles["location-input"]}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        style={{ color: "black" }}
        className={styles["input"]}
      />

      <div className={styles["scroll"]}>
        {autoComplete.map((location: Location) => {
          return (
            <div
              key={location.properties.place_id}
              className={styles["location-row"]}
              onClick={() => handleSelect(location)}
            >
              <div>
                {location.properties.name +
                  " " +
                  location.properties.address_line2}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSelectInput;
