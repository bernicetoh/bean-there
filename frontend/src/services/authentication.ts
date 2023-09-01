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
  username: string
) {
  return await axios.post("/users/signup", {
    name: name,
    email: email,
    password: password,
    confirmPassword: repassword,
    username: username,
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

export async function updateMe(name: string, email: string, token: string) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.patch("/users/updateMe", { name, email }, config);
  const parsedData: UserDetails = data.data.data as UserDetails;
  return parsedData;
}

export async function updateMyPassword(
  curr: string,
  newPassword: string,
  rePassword: string,
  token: string
) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.post(
    "/users/updateMyPassword",
    {
      passwordCurrent: curr,
      password: newPassword,
      confirmPassword: rePassword,
    },
    config
  );
  const parsedData: string = data.data.data;
  return parsedData;
}
