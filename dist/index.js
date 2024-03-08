"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiRequest = void 0;
const axios_1 = __importDefault(require("axios"));
function useApiRequest() {
    const ApiRequest = async ({ route, method, body, headers, }) => {
        let dataToSend = body;
        try {
            let response;
            const url = `${route}`;
            if (method === "POST") {
                response = await axios_1.default.post(url, dataToSend, {
                    headers: headers
                });
            }
            else if (method === "GET") {
                response = await axios_1.default.get(url, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            }
            else if (method === "DELETE") {
                response = await axios_1.default.delete(url, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            }
            else if (method === "PUT") {
                response = await axios_1.default.put(url, dataToSend, {
                    headers: headers
                });
            }
            else if (method === "PATCH") {
                response = await axios_1.default.patch(url, dataToSend, {
                    headers: headers
                });
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    };
    return ApiRequest;
}
exports.useApiRequest = useApiRequest;
