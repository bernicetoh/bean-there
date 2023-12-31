import { ReviewUserDetails } from "./user.model";

export interface Review {
  title: string;
  locationCoord: [number, number];
  locationAddress: string;
  locationName: string;
  id: number;
  coffeeType: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  visitedAt: Date;
  createdAt: Date;
  user: ReviewUserDetails;
}

export interface RatingByLocation {
  // name of coffee spot
  _id: string;
  numReviews: number;
  averageRating: number;
  locationCoords: [number, number];
  locationAddress: string;
}
