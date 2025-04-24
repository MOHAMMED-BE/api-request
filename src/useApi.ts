// src/useApi.ts
import { useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiError extends AxiosError {
  message: string;
  redirectToLogin?: boolean;
}

interface UseApiReturn {
  apiCall: <T = unknown>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export const useApi = (api: {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}): UseApiReturn => {

  const apiCall = useCallback(
    async <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      try {
        const response = await api(config);
        return response as AxiosResponse<T>;
      } catch (error) {
        const apiError = error as ApiError;
        throw apiError;
      }
    },
    [api]
  );

  return { apiCall };
};