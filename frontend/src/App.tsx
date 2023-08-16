import React, { useEffect, useState } from "react";
import { getAllReviews } from "./services/review";
import { Review } from "./models/review.model";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
