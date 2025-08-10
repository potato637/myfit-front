import axios from "axios";
import { applyInterceptors } from "./middlewares";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

applyInterceptors(apiInstance);

export default apiInstance;
