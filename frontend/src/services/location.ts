import axios from "axios";
import { Location } from "../models/location.model";

export const getAddressFromCoords = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=d1068570901b47a79c31cdd05445a4e6`
    );
    console.log(res);
    const parsedData: Location = res.data.features[0] as Location;
    console.log(parsedData.properties);
    return parsedData.properties.address_line2
      ? parsedData.properties.address_line2
      : parsedData.properties.address_line1;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const getAutoComplete = async (search: string): Promise<Location[]> => {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=d1068570901b47a79c31cdd05445a4e6`
    );
    const parsedData: Location[] = res.data.features as Location[];
    return parsedData;
  } catch (err) {
    console.log(err);
    return [];
  }
};
