import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export function applyLoggerInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const url = config.url || '';
      const params = config.params ? new URLSearchParams(config.params).toString() : '';
      const fullUrl = params ? `${url}?${params}` : url;
      
      console.log(`[Request] ${config.method?.toUpperCase()} ${fullUrl}`);
      console.log("Headers:", config.headers);
      if (config.data) {
        console.log("Request Body:", config.data);
      }
      console.log("------------------------------------");
      return config;
    },
    (error: AxiosError) => {
      const url = error.config?.url || '';
      const params = (error.config as any)?.params ? new URLSearchParams((error.config as any).params).toString() : '';
      const fullUrl = params ? `${url}?${params}` : url;
      
      console.error(
        `[Request Error] ${error.config?.method?.toUpperCase()} ${fullUrl}`,
        error
      );
      console.log("------------------------------------");
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const url = response.config.url || '';
      const params = (response.config as any)?.params ? new URLSearchParams((response.config as any).params).toString() : '';
      const fullUrl = params ? `${url}?${params}` : url;
      
      console.log(
        `[Response] ${response.config.method?.toUpperCase()} ${fullUrl} - Status: ${response.status}`
      );
      console.log("Response Data:", response.data);
      console.log("------------------------------------");
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const url = error.config?.url || '';
        const params = (error.config as any)?.params ? new URLSearchParams((error.config as any).params).toString() : '';
        const fullUrl = params ? `${url}?${params}` : url;
        
        console.error(
          `[Response Error] ${error.config?.method?.toUpperCase()} ${fullUrl} - Status: ${error.response.status}`,
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
      console.log("------------------------------------");
      return Promise.reject(error);
    }
  );
}
