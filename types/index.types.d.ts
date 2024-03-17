import { AxiosRequestHeaders } from "axios";
export interface ApiResponse<T = any> {
    data: T;
    status: number;
}
export interface ApiError {
    message: string;
    code: number;
}
export interface ApiRequestProps<TBody = any> {
    route: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    requiresAuth?: boolean;
    data?: TBody;
    headers?: AxiosRequestHeaders;
    params?: Record<string, any>;
    token?: string;
}
