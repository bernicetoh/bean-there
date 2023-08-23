import React, { useEffect, useState } from "react";
import { getAllReviews } from "./services/review";
import { Review } from "./models/review.model";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReviewsPage from "./pages/ReviewsPage";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReviewFull from "./components/reviews-page/ReviewFull";
import { Modal } from "./components/modal/Modal";
import HomePage from "./pages/HomePage";
import TopNavigation from "./components/top-bar/TopNavigation";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <TopNavigation>
        <AnimatePresence mode="wait">
          <Routes location={previousLocation || location}>
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/" element={<AuthenticatedPage />} /> */}
          </Routes>
        </AnimatePresence>
      </TopNavigation>

      {previousLocation && (
        <Routes>
          <Route
            path="/reviews/:postId"
            element={
              <Modal>
                <ReviewFull />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
