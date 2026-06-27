import { ApiResponse } from "@/types/apiResponse.types";
import { getErrorMessage } from "@/utils/errorHandler";


const BASE_URL = process.env.API_BASE_URL;

export class ApiService {
    private async request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        const token = sessionStorage.getItem('token');

        let response: Response;

        try {
            response = await fetch(`${BASE_URL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && {
                        Authorization: `Bearer ${token}`,
                    }),
                    ...options?.headers,
                },
                ...options,
            });
        } catch (error) {
            // network error (server down / no internet/ CORS )
            const message = getErrorMessage(error);
            throw new Error(message); //Stop execution
        }

        let apiResponse: ApiResponse<T> | null = null;

        try {
            apiResponse = await response.json();
        } catch {
            // catch block
        }

        if (!response.ok || apiResponse?.error) {
            const message = apiResponse?.message || `Request failed with status ${response.status}`;
            throw new Error(message);
        }

        // If backend returns: invalid JSON or empty response or unexpected format
        if (!apiResponse) {
            throw new Error('Invalid server response');
        }

        return apiResponse;
    }

    //GET Request
    get<T>(url: string): Promise<ApiResponse<T>> {
        return this.request<T>(url);
    }

    //POST Request
    post<TResponse, TRequest>(url: string, body: TRequest): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(url, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    //PUT Request
    put<TResponse, TRequest>(url: string, body: TRequest): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    //PATCH Request
    patch<TResponse, TRequest>(url: string, body: TRequest): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    //DELETE Request
    delete<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(url, {
            method: 'DELETE',
        });
    }
}

//Instance of ApiService
const api = new ApiService();

export default api;