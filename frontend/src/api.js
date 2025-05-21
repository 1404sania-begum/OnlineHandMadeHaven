
import axios from "axios";

const API_URL = "http://localhost:8000/api/";
// const API_URL = "http://localhost:8001/api/";

// User Registration API
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

// User Login API
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Products API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}products`);
    return response.data;
  } catch (error) {
    console.error("Fetch Products Error:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch User Orders API (with Authorization)
export const fetchUserOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found!");

    const response = await axios.get(`${API_URL}orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Orders Error:", error.response?.data || error.message);
    throw error;
  }
};
