import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
interface UseApiReturn {
    apiCall: <T = any>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}
export declare const useApi: (api: AxiosInstance) => UseApiReturn;
export {};
