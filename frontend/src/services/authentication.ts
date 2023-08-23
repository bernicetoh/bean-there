import axios from "axios";
import { UserDetails } from "../models/user.model";
export async function login(email: string, password: string) {
  return await axios.post("/users/login", {
    email: email,
    password: password,
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
