import React, { useEffect, useState } from "react";
import { Review } from "../models/review.model";
import { getAllReviews } from "../services/review";

interface Props {
  query: string;
}
function useFilteredSearch({ query }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    setReviews([]);
    setPageNumber(1);
  }, [query]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   setLoading(true);
  //   setError(false);
  //   getAllReviews(query, controller.signal) // TODO: get workspace id somewhere else
  //     .then((res) => {
  //       const newReviews: Review[] = res;
  //       setLoading(false);
  //       if (newReviews.length === 0) {
  //         setHasMore(false);
  //         return;
  //       }
  //       setHasMore(true);
  //       setReviews((review) => reviews.concat(newReviews));
  //     })
  //     .catch(() => {
  //       if (!controller.signal.aborted) {
  //         setError(true);
  //       }
  //     });
  //   return () => controller.abort();
  // }, [query, pageNumber]);

  const nextPage = () => setPageNumber((prev) => prev + 1);

  return { loading, error, reviews, hasMore, nextPage };
}

export default useFilteredSearch;
