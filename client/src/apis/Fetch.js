import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
    ? "api"
    : "http://localhost:3005/api" // development mode

export default axios.create({
    baseURL: baseURL
});