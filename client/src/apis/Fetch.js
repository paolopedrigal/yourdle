import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://yourdle.lol/api"
    : // "http://10.0.0.178:3001/api" ||
      "http://192.168.68.62:3001/api" || "http://localhost:3001/api"; // development mode (WSL | localhost)

export default axios.create({
  baseURL: baseURL,
});
