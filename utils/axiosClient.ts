import axios from "axios";

// Create an instance of axios with default configurations
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Make sure to add the base API URL in .env
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

export default axiosClient;
