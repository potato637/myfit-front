import axios from "axios";
import { applyInterceptors } from "./middlewares";

const apiInstance = axios.create({
  baseURL: "",
  withCredentials: true,
  timeout: 10000,
});

applyInterceptors(apiInstance);

export default apiInstance;
