import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export function applyLoggerInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
      console.log("Headers:", config.headers);
      if (config.data) {
        console.log("Request Body:", config.data);
      }
      console.log("----------------------------------------------------");
      return config;
    },
    (error: AxiosError) => {
      console.error(
        `[Request Error] ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        }`,
        error
      );
      console.log("----------------------------------------------------");
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(
        `[Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        } - Status: ${response.status}`
      );
      console.log("Response Data:", response.data);
      console.log("----------------------------------------------------");
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        console.error(
          `[Response Error] ${error.config?.method?.toUpperCase()} ${
            error.config?.url
          } - Status: ${error.response.status}`,
          error.response.data
        );
        console.log("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error(
          `[Network Error] No response received for ${error.config?.method?.toUpperCase()} ${
            error.config?.url
          }`,
          error.request
        );
      } else {
        console.error(
          `[Axios Error] Error setting up request: ${error.message}`,
          error
        );
      }
      console.log("----------------------------------------------------");
      return Promise.reject(error);
    }
  );
}
