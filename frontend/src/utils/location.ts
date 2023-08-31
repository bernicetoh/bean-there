import { RatingByLocation } from "../models/review.model";

export const sortCoordsByNearest = (
  ratingsArray: RatingByLocation[],
  refCoord: [number, number]
) => {
  if (!ratingsArray) return;
  return ratingsArray.sort((rating1, rating2) => {
    const distance1 = calcCrow(
      refCoord[0],
      refCoord[1],
      rating1.locationCoords[0],
      rating1.locationCoords[1]
    );
    const distance2 = calcCrow(
      refCoord[0],
      refCoord[1],
      rating2.locationCoords[0],
      rating2.locationCoords[1]
    );
    return distance2 - distance1;
  });
};

// Function to calculate the distance between two coordinates using Haversine formula
export function calcCrow(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(value: number) {
  return (value * Math.PI) / 180;
}
