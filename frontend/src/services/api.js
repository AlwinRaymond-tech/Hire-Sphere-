import axios from "axios";

const API = axios.create({
  baseURL: "https://hire-sphere-wzis.onrender.com/api",
});

export default API;