import { ReviewUserDetails } from "./user.model";

export interface Review {
  name: string;
  location: string;
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
