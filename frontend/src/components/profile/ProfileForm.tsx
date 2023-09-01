import React, { Dispatch, SetStateAction } from "react";
import ProfilePage from "../../pages/ProfilePage";
import ChangePassword from "./ChangePassword";
import { UserDetails } from "../../models/user.model";
import Profile from "./Profile";

interface Props {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
function ProfileForm({ mode, setMode }: Props) {
  return (
    <React.Fragment>
      <div style={{ height: "100%" }}>
        {mode === "Profile" ? (
          <Profile setMode={setMode} />
        ) : (
          <ChangePassword setMode={setMode} />
        )}
      </div>
    </React.Fragment>
  );
}

export default ProfileForm;
