import { RatingByLocation, Review } from "../models/review.model";
import axiosInstance from "../config/axios";

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
    const res = await axiosInstance.get("/reviews", queryName ? config : {});
    const parsedData: Review[] = res.data.data as Review[];
    return parsedData;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getReviewById(id: string): Promise<Review> {
  const res = await axiosInstance.get(`/reviews/${id}`);
  const parsedData: Review = res.data.data as Review;
  return parsedData;
}

export async function createReview(
  title: string,
  location_coords: number[],
  location_name: string,
  location_address: string,
  type: string,
  price: string,
  rating: number,
  desc: string,
  visitedOn: Date | null,
  token: string,
  userId: string
): Promise<Review> {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axiosInstance.post(
    "/reviews",
    {
      title: title,
      locationAddress: location_address,
      locationName: location_name,
      locationCoord: location_coords,
      coffeeType: type,
      price: price,
      rating: rating,
      visitedAt: visitedOn,
      user: userId,
      desc: desc,
      createdAt: Date.now(),
    },
    config
  );
  const parsedData = res.data.data as Review;
  console.log(parsedData);
  return parsedData;
}

export async function getAverageRatingByLocation(): Promise<
  RatingByLocation[]
> {
  try {
    const res = await axiosInstance.get("/reviews/average-rating-by-location");
    const parsedData: RatingByLocation[] = (await res.data
      .data) as RatingByLocation[];
    return parsedData;
  } catch (err) {
    return [] as RatingByLocation[];
  }
}

export async function getBestRatedLocations(): Promise<RatingByLocation[]> {
  try {
    const res = await axiosInstance.get("/reviews/best-rated-locations");
    const parsedData: RatingByLocation[] = (await res.data
      .data) as RatingByLocation[];
    return parsedData;
  } catch (err) {
    return [] as RatingByLocation[];
  }
}
