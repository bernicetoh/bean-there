import { RatingByLocation } from "../models/review.model";

export const sortCoordsByNearest = (
  ratingsArray: RatingByLocation[],
  refCoord: [number, number]
) => {
  if (!ratingsArray) return;
  return ratingsArray.sort((rating1, rating2) => {
    const distance1 = haversineDistance(refCoord, rating1.locationCoords);
    const distance2 = haversineDistance(refCoord, rating2.locationCoords);
    return distance1 - distance2;
  });
};

// Function to calculate the distance between two coordinates using Haversine formula
function haversineDistance(coord1: [number, number], coord2: [number, number]) {
  const earthRadius = 6371; // Earth's radius in kilometers
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

// Function to convert degrees to radians
function toRad(degrees: number) {
  return degrees * (Math.PI / 180);
}
