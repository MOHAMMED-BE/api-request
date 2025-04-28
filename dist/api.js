var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export const createApi = (baseURL, token) => {
    const api = axios.create({
        baseURL,
    });
    api.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
        const requiresAuth = config.requiresAuth;
        if (requiresAuth && config.headers) {
            const authToken = token;
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
        }
        return config;
    }));
    api.interceptors.response.use((response) => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
            ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) ||
            'Something went wrong';
        if (((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) === 401) {
            return Promise.reject(Object.assign(Object.assign({}, error), { message, redirectToLogin: true }));
        }
        return Promise.reject(Object.assign(Object.assign({}, error), { message }));
    }));
    return api;
};
