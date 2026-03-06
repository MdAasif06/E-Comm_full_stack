import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
});

API.interceptors.request.use((req) => {

  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const user = JSON.parse(userInfo);

    if (user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return req;
});

export default API;