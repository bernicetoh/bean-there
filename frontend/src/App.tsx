import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReviewsPage from "./pages/ReviewsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReviewFull from "./components/reviews-page/ReviewFull";
import { Modal } from "./components/modal/Modal";
import HomePage from "./pages/HomePage";
import TopNavigation from "./components/top-bar/TopNavigation";
import { AnimatePresence } from "framer-motion";
import LocatePage from "./pages/LocatePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes location={previousLocation || location}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/" element={<TopNavigation />}>
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="locate" element={<LocatePage />} />
          </Route>
        </Routes>

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
      </AnimatePresence>
    </div>
  );
}

export default App;
