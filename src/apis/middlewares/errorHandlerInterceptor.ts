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
        alert(
          "네트워크 연결 상태를 확인해주세요. 문제가 지속되면 관리자에게 문의하세요."
        );
        return Promise.reject(error);
      }

      const { status, data } = error.response;
      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      switch (status) {
        case 400: // Bad Request
          errorMessage = "잘못된 요청입니다. 입력값을 확인해주세요.";
          console.error(`HTTP 400 Bad Request: ${errorMessage}`, data);
          alert(errorMessage);
          return Promise.reject(error);

        case 401: // Unauthorized
          console.error("HTTP 401 Unauthorized: Session expired or invalid.");
          alert(
            "세션이 만료되었거나 인증에 실패했습니다. 다시 로그인해주세요."
          );
          window.location.href = "/login";
          return Promise.reject(error);

        case 403: // Forbidden
          errorMessage = "접근 권한이 없습니다.";
          console.error(`HTTP 403 Forbidden: ${errorMessage}`, data);
          alert(errorMessage);
          return Promise.reject(error);

        case 404: // Not Found
          errorMessage = "요청하신 페이지나 리소스를 찾을 수 없습니다.";
          console.error(`HTTP 404 Not Found: ${errorMessage}`, data);
          alert(errorMessage);
          window.location.href = "/home";
          return Promise.reject(error);

        case 500: // Internal Server Error
        case 502: // Bad Gateway
        case 503: // Service Unavailable
          errorMessage =
            "서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          console.error(`HTTP ${status} Server Error: ${errorMessage}`, data);
          alert(errorMessage);
          window.location.href = "/error";
          return Promise.reject(error);

        default: // unexpected
          errorMessage = `알 수 없는 오류가 발생했습니다 (상태 코드: ${status}).`;
          console.error(
            `Unhandled HTTP Status ${status}: ${errorMessage}`,
            data
          );
          alert(errorMessage);
          return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}
