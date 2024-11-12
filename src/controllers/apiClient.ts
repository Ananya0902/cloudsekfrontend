import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.example.com';
const token = process.env.REACT_APP_BEARER_TOKEN as string;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

const _get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
};

const _delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
};

const _put = async <T>(url: string, data: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
};

const _post = async <T>(url: string, data: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
};

// Export API methods
export { _get, _delete, _put, _post };
