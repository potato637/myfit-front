import { AxiosInstance } from "axios";
import { applyLoggerInterceptor } from "./loggerInterceptor";
import { applyErrorHandlerInterceptor } from "./errorHandlerInterceptor";

export function applyInterceptors(apiInstance: AxiosInstance): void {
  applyLoggerInterceptor(apiInstance);
  applyErrorHandlerInterceptor(apiInstance);
}
