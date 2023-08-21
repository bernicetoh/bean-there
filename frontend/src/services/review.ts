import { Review } from "../models/review.model";
import axios from "axios";
export async function getAllReviews(
  queryName: string,
  abortSignal: AbortSignal
): Promise<Review[]> {
  // page = 1,
  // query: string
  // abortSignal: AbortSignal
  try {
    const config = {
      params: { name: queryName },
      abortSignal: abortSignal,
      withCredentials: true,
    };
    const res = await axios.get("/reviews", queryName ? config : {});
    const parsedData: Review[] = res.data.data as Review[];
    return parsedData;
  } catch (err) {
    console.error(err);
    return [];
  }
}
