import axios from "axios";
export async function login(email: string, password: string) {
  const user = await axios.post("/users/login", {
    email: email,
    password: password,
  });
  return user;
}
