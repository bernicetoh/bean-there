import React, { useEffect, useState } from "react";
import { getAllReviews } from "./services/review";
import { Review } from "./models/review.model";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewsPage from "./pages/ReviewsPage";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
