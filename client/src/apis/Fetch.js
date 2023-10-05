import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "api"
    : "http://10.0.0.178:3005/api" ||
      "http://192.168.68.61:3005/api" ||
      "http://localhost:3005/api"; // development mode (WSL | localhost)

export default axios.create({
  baseURL: baseURL,
});
