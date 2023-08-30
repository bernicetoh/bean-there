import { ReviewUserDetails } from "./user.model";

export interface Review {
  title: string;
  locationCoord: [number, number];
  locationAddress: string;
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
// "64e41ff1699ed66428b34c2f"

export interface RatingByLocation {
  // name of coffee spot
  _id: string;
  numReviews: number;
  averageRating: number;
  locationCoords: [number, number];
  locationAddress: string;
}
