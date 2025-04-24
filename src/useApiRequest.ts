// src/hooks/useApiRequest.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRequestProps, ApiResponse, ApiError } from './index.types';

// Optional: Allow passing a custom Axios instance for flexibility
interface UseApiRequestOptions {
  axiosInstance?: typeof axios;
}

function useApiRequest<T = any>({ axiosInstance = axios }: UseApiRequestOptions = {}) {
  const apiRequest = async ({
    route,
    method,
    requiresAuth = false,
    data,
    headers,
    params,
    token,
  }: ApiRequestProps<T>): Promise<ApiResponse<T>> => {
    const authorizationHeader: Record<string, string> = {
      ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config: AxiosRequestConfig = {
      method,
      url: route,
      data,
      params,
      headers: { ...authorizationHeader, ...headers }
    };

    try {
      const response: AxiosResponse<T> = await axiosInstance(config);
      return { data: response.data, status: response.status };
    } catch (error) {
      // Inline error handling without isAxiosError
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: any; status?: number }; message?: string };
        throw {
          message:
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            'An error occurred',
          code: err.response?.status || 500,
        } as ApiError;
      }
      throw { message: 'An unexpected error occurred', code: 500 } as ApiError;
    }
  };

  return { apiRequest };
}

export default useApiRequest;