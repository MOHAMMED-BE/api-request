import axios from "axios";
import { ApiError, ApiRequestProps, ApiResponse } from './index.types'


function useApiRequest<T = any>() {

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

        try {
            const response = await axios({
                method,
                url: route,
                data: data,
                params,
                headers: { ...authorizationHeader, ...headers },
            });

            return { data: response.data, status: response.status };
        } catch (error) {
            const apiError: ApiError = transformError(error);
            throw apiError;
        }

    };

    return { apiRequest };
}

function transformError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message || "An error occurred",
            code: error.response?.status || 500,
        };
    }
    return { message: "An unexpected error occurred", code: 500 };
}


export default useApiRequest