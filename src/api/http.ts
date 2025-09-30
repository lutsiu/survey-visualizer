import axios from "axios";

export const http = axios.create({
  baseURL: "https://opentdb.com",
  timeout: 100000
});

http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(new Error(
    err.response?.data?.message || err.message || "Network error"
  ))
);