import { ReactNode, createContext, useState } from "react";
import { UserDetails } from "../models/user.model";

interface AuthState {
  userInfo: UserDetails;
  loggedIn: boolean;
}

export interface AuthContextProps {
  authState: AuthState;
  setAuthState: (authInfo: AuthState) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState({
    userInfo: {
      name: "",
      email: "",
      username: "",
      photo: "",
      role: "",
      active: false,
      _id: "",
    },
    loggedIn: false,
  });

  return <Provider value={{ authState, setAuthState }}>{children}</Provider>;
};

export default AuthContext;
