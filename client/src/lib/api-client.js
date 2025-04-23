import axios from "axios";
import { HOST } from "@/utils/constants.js";


const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;