import React, { Dispatch, SetStateAction } from "react";
import ReviewsPage from "../pages/ReviewsPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

interface Props {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
function AuthForm({ mode, setMode }: Props) {
  return (
    <React.Fragment>
      <div style={{ height: "100%" }}>
        {mode === "Login" ? (
          <LoginPage setMode={setMode} />
        ) : (
          <SignupPage setMode={setMode} />
        )}
      </div>
    </React.Fragment>
  );
}

export default AuthForm;
