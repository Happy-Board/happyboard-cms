
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
  withCredentials: false,
})

if (typeof window !== 'undefined') {
  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('accessToken') || '';
    config.headers['x-client-id'] = localStorage.getItem('uid') || '';
    config.headers['device-token'] = localStorage.getItem('device-token') || '';
    return config;
  });
}

