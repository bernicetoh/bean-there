import axios from "axios";

const baseURL = "https://bean-there-api.onrender.com/api/v1";
console.log(`baseURL: ${baseURL}`);
const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
