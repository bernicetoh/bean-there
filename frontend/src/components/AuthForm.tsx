import React from "react";
import { AuthMode } from "../pages/AuthenticatedPage";
import ReviewsPage from "../pages/ReviewsPage";
import HomePage from "../pages/HomePage";

interface Props {
  mode: string;
}
function AuthForm({ mode }: Props) {
  return (
    <React.Fragment>
      <div style={{ height: "100%" }}>
        {mode === AuthMode.REVIEWS && <ReviewsPage />}
        {mode === AuthMode.HOME && <HomePage />}
      </div>
    </React.Fragment>
  );
}

export default AuthForm;
