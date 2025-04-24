import { ApiRequestProps, ApiResponse } from './index.types';
declare function useApiRequest<T = any>(): {
    apiRequest: ({ route, method, requiresAuth, data, headers, params, token, }: ApiRequestProps<T>) => Promise<ApiResponse<T>>;
};
export default useApiRequest;
