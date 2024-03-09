"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiRequest = void 0;
const axios_1 = __importDefault(require("axios"));
// interface Progress {
//     loaded: number;
//     total: number;
//     percentage: number;
// }
function useApiRequest() {
    // const [progress, setProgress] = useState<Progress>({ loaded: 0, total: 0, percentage: 0 });
    const apiRequest = async ({ route, method, requiresAuth = false, data, headers, params, token, }) => {
        // const authorizationHeader: AxiosRequestHeaders = {
        //     ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        // };
        // const authorizationHeader: Record<string, string> = {
        //     ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        // };
        const authorizationHeader = {
            ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        };
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
        const config = {
            method,
            url: `${route}`,
            data,
            params,
            headers: { ...authorizationHeader, ...headers },
            // onUploadProgress: ['POST', 'PUT'].includes(method) ? onUploadProgress : undefined,
            // onDownloadProgress: method === 'GET' ? onDownloadProgress : undefined,
        };
        try {
            const response = await (0, axios_1.default)(config);
            return response;
        }
        catch (error) {
            const apiError = transformError(error);
            throw apiError;
        }
    };
    return { apiRequest };
}
exports.useApiRequest = useApiRequest;
function transformError(error) {
    var _a, _b, _c;
    if (axios_1.default.isAxiosError(error)) {
        return {
            message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "An error occurred",
            code: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500,
        };
    }
    return { message: "An unexpected error occurred", code: 500 };
}
