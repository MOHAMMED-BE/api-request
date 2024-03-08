import axios, { AxiosRequestHeaders } from "axios"

interface ApiRequestProps {
    route: string
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    body?: any
    headers?: AxiosRequestHeaders
}

export function useApiRequest() {
    const ApiRequest = async ({
        route,
        method,
        body,
        headers,
    }: ApiRequestProps) => {

        let dataToSend: any = body

        try {
            let response: any
            const url = `${route}`

            if (method === "POST") {
                response = await axios.post(url, dataToSend, {
                    headers: headers
                })
            } else if (method === "GET") {
                response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            } else if (method === "DELETE") {
                response = await axios.delete(url, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            } else if (method === "PUT") {
                response = await axios.put(url, dataToSend, {
                    headers: headers
                })
            } else if (method === "PATCH") {
                response = await axios.patch(url, dataToSend, {
                    headers: headers
                })
            }

            return response
        } catch (error) {
            throw error
        }
    }

    return ApiRequest
}
