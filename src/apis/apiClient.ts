import axios from "axios";
import { applyInterceptors } from "./middlewares";

const apiInstance = axios.create({
  baseURL: "http://3.36.59.150:3000",
  withCredentials: true, // 백엔드에서 주는 도메인 주소 보고 설정할 것임
  timeout: 10000,
});

applyInterceptors(apiInstance);

export default apiInstance;
