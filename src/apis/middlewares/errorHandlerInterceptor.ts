import { AxiosInstance, AxiosError } from "axios";

export function applyErrorHandlerInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      // Network error
      if (!error.response) {
        console.error("Network Error or No Response:", error.message);
        console.error("🔍 [디버깅] 네트워크 에러 상세:", error);
        return Promise.reject(error);
      }

      const { status, data } = error.response;
      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      switch (status) {
        case 400: // Bad Request
          errorMessage = "잘못된 요청입니다. 입력값을 확인해주세요.";
          console.error(`HTTP 400 Bad Request: ${errorMessage}`, data);
          return Promise.reject(error);

        case 401: // Unauthorized
          console.error("HTTP 401 Unauthorized: Session expired or invalid.");
          console.error("🔍 [디버깅] 401 에러 상세:", error.response?.data);

          window.dispatchEvent(new CustomEvent("auth:logout"));

          return Promise.reject(error);

        case 403: // Forbidden
          errorMessage = "접근 권한이 없습니다.";
          console.error(`HTTP 403 Forbidden: ${errorMessage}`, data);
          return Promise.reject(error);

        case 404: // Not Found
          errorMessage = "요청하신 페이지나 리소스를 찾을 수 없습니다.";
          console.error(`HTTP 404 Not Found: ${errorMessage}`, data);
          console.error("🔍 [디버깅] 404 에러 상세:", {
            status,
            data,
            url: error.config?.url,
          });
          return Promise.reject(error);

        case 500: // Internal Server Error
        case 502: // Bad Gateway
        case 503: // Service Unavailable
          errorMessage =
            "서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          console.error(`HTTP ${status} Server Error: ${errorMessage}`, data);
          console.error("🔍 [디버깅] 서버 에러 상세:", {
            status,
            data,
            url: error.config?.url,
          });
          return Promise.reject(error);

        default: // unexpected
          errorMessage = `알 수 없는 오류가 발생했습니다 (상태 코드: ${status}).`;
          console.error(
            `Unhandled HTTP Status ${status}: ${errorMessage}`,
            data
          );
          console.error("🔍 [디버깅] 알 수 없는 에러 상세:", {
            status,
            data,
            url: error.config?.url,
          });
          return Promise.reject(error);
      }
    }
  );
}
