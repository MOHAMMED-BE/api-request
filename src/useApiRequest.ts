// src/hooks/useApiRequest.ts
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    isAxiosError,
    AxiosInstance
} from 'axios';

export interface ApiRequestProps<T = any> {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    requiresAuth?: boolean;
    token?: string;
    data?: T;
    params?: AxiosRequestConfig['params'];
    headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
    data: T;
    status: number;
}

export interface ApiError {
    message: string;
    code: number;
}

interface UseApiRequestOptions {
    axiosInstance?: AxiosInstance;
}

export function useApiRequest({ axiosInstance = axios }: UseApiRequestOptions = {}) {
    const apiRequest = async <T = any>({
        route,
        method,
        requiresAuth = false,
        data,
        params,
        headers,
        token
    }: ApiRequestProps): Promise<ApiResponse<T>> => {
        const config: AxiosRequestConfig = {
            method,
            url: route,
            data,
            params,
            headers: {
                ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers
            }
        };

        try {
            const response: AxiosResponse<T> = await axiosInstance(config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            if (isAxiosError(error)) {
                const axiosError = error as AxiosError<{
                    message?: string;
                    detail?: string;
                }>;

                throw {
                    message:
                        axiosError.response?.data?.message ||
                        axiosError.response?.data?.detail ||
                        axiosError.message ||
                        'Request failed',
                    code: axiosError.response?.status || 500
                } as ApiError;
            }

            throw {
                message: 'An unexpected error occurred',
                code: 500
            } as ApiError;
        }
    };

    return { apiRequest };
}

export default useApiRequest;