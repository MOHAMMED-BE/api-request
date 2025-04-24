// src/hooks/useApiRequest.ts
import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
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
            const apiError: ApiError = transformError(error);
            throw apiError;
        }
    };

    return { apiRequest };
}

function transformError(error: unknown): ApiError {
    if (isAxiosError(error)) {
        return {
            message:
                error.response?.data?.message ||
                error.response?.data?.detail ||
                error.message ||
                'An error occurred',
            code: error.response?.status || 500,
        };
    }
    return { message: 'An unexpected error occurred', code: 500 };
}

export default useApiRequest;