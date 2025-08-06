import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://instaclone-byankur-backend.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
