import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

interface ApiResponse<T = any> {
    data: T;
    status: number;
}

interface ApiError {
    message: string;
    code: number;
}

interface ApiRequestProps<TBody = any> {
    route: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    requiresAuth?: boolean;
    data?: TBody;
    headers?: AxiosRequestHeaders;
    params?: Record<string, any>;
    token?: string;
}

// interface Progress {
//     loaded: number;
//     total: number;
//     percentage: number;
// }

export function useApiRequest<T = any>() {
    // const [progress, setProgress] = useState<Progress>({ loaded: 0, total: 0, percentage: 0 });

    const apiRequest = async ({
        route,
        method,
        requiresAuth = false,
        data,
        headers,
        params,
        token,
    }: ApiRequestProps<T>): Promise<ApiResponse<T>> => {
        // const authorizationHeader: AxiosRequestHeaders = {
        //     ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        // };

        // const authorizationHeader: Record<string, string> = {
        //     ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        // };

        const authorizationHeader: AxiosRequestHeaders = {
            ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        } as AxiosRequestHeaders;

        // const authorizationHeader: Partial<AxiosRequestHeaders> = {};
        // if (requiresAuth && token) {
        //     authorizationHeader.Authorization = `Bearer ${token}`;
        // }



        // const onUploadProgress = (progressEvent: ProgressEvent) => {
        //     const { loaded, total } = progressEvent;
        //     const percentage = total > 0 ? Math.floor((loaded / total) * 100) : 0; // Prevent division by zero
        //     setProgress({
        //         loaded,
        //         total,
        //         percentage,
        //     });
        // };

        // const onDownloadProgress = (progressEvent: ProgressEvent) => {
        //     const { loaded, total } = progressEvent;
        //     const percentage = total > 0 ? Math.floor((loaded / total) * 100) : 0;
        //     setProgress({
        //         loaded,
        //         total,
        //         percentage,
        //     });
        // };

        const config: AxiosRequestConfig = {
            method,
            url: `${route}`,
            data,
            params,
            headers: { ...authorizationHeader, ...headers },
            // onUploadProgress: ['POST', 'PUT'].includes(method) ? onUploadProgress : undefined,
            // onDownloadProgress: method === 'GET' ? onDownloadProgress : undefined,
        };

        try {
            const response = await axios(config);

            return response;

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
