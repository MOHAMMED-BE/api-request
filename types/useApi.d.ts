import { AxiosRequestConfig, AxiosResponse } from 'axios';
interface UseApiReturn {
    apiCall: <T = unknown>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}
export declare const useApi: (api: (config: AxiosRequestConfig) => Promise<AxiosResponse>) => UseApiReturn;
export {};
