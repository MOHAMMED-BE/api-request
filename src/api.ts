import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

interface ErrorResponse {
    message?: string;
    detail?: string;
}

export const createApi = (baseURL: string, token?: string): AxiosInstance => {
    const api = axios.create({
        baseURL,
    });

    api.interceptors.request.use(
        async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
            const requiresAuth = config.requiresAuth;

            if (requiresAuth && config.headers) {
                const authToken = token;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
            }

            return config;
        }
    );

    api.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError<ErrorResponse>) => {
            const message =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                'Something went wrong';

            if (error.response?.status === 401) {
                return Promise.reject({ ...error, message, redirectToLogin: true });
            }

            return Promise.reject({ ...error, message });
        }
    );

    return api;
};