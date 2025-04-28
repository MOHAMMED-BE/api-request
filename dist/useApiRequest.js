var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios, { isAxiosError } from 'axios';
export function useApiRequest({ axiosInstance = axios } = {}) {
    const apiRequest = (_a) => __awaiter(this, [_a], void 0, function* ({ route, method, requiresAuth = false, data, params, headers, token }) {
        var _b, _c, _d, _e, _f;
        const config = {
            method,
            url: route,
            data,
            params,
            headers: Object.assign(Object.assign({}, (requiresAuth && token ? { Authorization: `Bearer ${token}` } : {})), headers)
        };
        try {
            const response = yield axiosInstance(config);
            return {
                data: response.data,
                status: response.status
            };
        }
        catch (error) {
            if (isAxiosError(error)) {
                const axiosError = error;
                throw {
                    message: ((_c = (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                        ((_e = (_d = axiosError.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.detail) ||
                        axiosError.message ||
                        'Request failed',
                    code: ((_f = axiosError.response) === null || _f === void 0 ? void 0 : _f.status) || 500
                };
            }
            throw {
                message: 'An unexpected error occurred',
                code: 500
            };
        }
    });
    return { apiRequest };
}
export default useApiRequest;
