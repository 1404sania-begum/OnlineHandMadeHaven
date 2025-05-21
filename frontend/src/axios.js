// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Laravel backend base URL
  withCredentials: true,           // Important for cookies/session
});

export default instance;
