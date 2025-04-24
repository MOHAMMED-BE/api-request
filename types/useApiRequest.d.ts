import { AxiosRequestConfig, AxiosInstance } from 'axios';
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
export declare function useApiRequest({ axiosInstance }?: UseApiRequestOptions): {
    apiRequest: <T = any>({ route, method, requiresAuth, data, params, headers, token }: ApiRequestProps) => Promise<ApiResponse<T>>;
};
export default useApiRequest;
