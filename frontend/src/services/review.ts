import { Review } from "../models/review.model";
import axios from "axios";
export async function getAllReviews(
  queryName: string,
  abortSignal: AbortSignal
): Promise<Review[]> {
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

export async function getReviewById(id: string): Promise<Review> {
  const res = await axios.get(`/reviews/${id}`);
  const parsedData: Review = res.data.data as Review;
  return parsedData;
}

export async function createReview(
  name: string,
  location: string,
  type: string,
  price: number,
  rating: number,
  desc: string,
  visitedOn: Date | null,
  token: string,
  userId: string
): Promise<Review> {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.post(
    "/reviews",
    {
      name: name,
      location: location,
      coffeeType: type,
      price: price,
      rating: rating,
      visitedAt: visitedOn,
      user: userId,
      desc: desc,
    },
    config
  );
  const parsedData = res.data.data as Review;
  console.log(parsedData);
  return parsedData;
}
