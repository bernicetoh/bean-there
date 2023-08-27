import { UserDetails } from "../models/user.model";
import axios from "axios";
export async function login(email: string, password: string) {
  return await axios.post(
    "/users/login",
    {
      email: email,
      password: password,
    }
    // { withCredentials: true }
  );
}

export async function logout() {
  return await axios.get(
    "/users/logout"
    // { withCredentials: true }
  );
}
export async function signup(
  name: string,
  email: string,
  password: string,
  repassword: string,
  username: string,
  role: string
) {
  return await axios.post("/users/signup", {
    name: name,
    email: email,
    password: password,
    confirmPassword: repassword,
    username: username,
    role: role,
  });
}

export async function getCurrentUser(token: string) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.get("/users/me", config);
  const parsedData: UserDetails = data.data.data as UserDetails;
  return parsedData;
}
