import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token auto attach
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("userInfo")); // 🔑 use correct key

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;