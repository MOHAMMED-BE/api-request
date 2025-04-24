import axios from 'axios';
import { ApiRequestProps, ApiResponse } from './index.types';
interface UseApiRequestOptions {
    axiosInstance?: typeof axios;
}
declare function useApiRequest<T = any>({ axiosInstance }?: UseApiRequestOptions): {
    apiRequest: ({ route, method, requiresAuth, data, headers, params, token, }: ApiRequestProps<T>) => Promise<ApiResponse<T>>;
};
export default useApiRequest;
