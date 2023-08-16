import { Review } from "../models/review.model";
import axios from "axios";
export async function getAllReviews(): Promise<Review[]> {
  try {
    const res = await axios.get("/reviews");
    const parsedData: Review[] = res.data.data as Review[];
    return parsedData;
  } catch (err) {
    console.error(err);
    return [];
  }
}
