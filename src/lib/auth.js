// 'use client'


// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../configs/axios.config';

// const useAuth = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userId, setUserId] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const storedUserId = localStorage.getItem('uid');
//         const storedToken = localStorage.getItem('accessToken');

//         if (storedUserId && storedToken) {
//             setUserId(storedUserId);
//             setIsAuthenticated(true);
//             axiosInstance.defaults.headers['x-client-id'] = storedUserId;
//             axiosInstance.defaults.headers['Authorization'] = storedToken;
//         }
//         setLoading(false);
//     }, []);

//     const login = async (email, password) => {
//         try {
//             const response = await axiosInstance.post('/signin', { email, password }).then(res => {
//                 return res.data.data;
//             })

//             const accessToken = response.tokens;
//             const user = response.user
//             localStorage.setItem('accessToken', accessToken.accessToken);
//             localStorage.setItem('uid', user.id);
//             setUserId(user.id);
//             setIsAuthenticated(true);
//             axiosInstance.defaults.headers['x-client-id'] = user.id;
//             axiosInstance.defaults.headers['Authorization'] = accessToken;
//             return true;
//         } catch (error) {
//             console.error('Login failed', error);
//             return false;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('uid');
//         setIsAuthenticated(false);
//         setUserId(null);
//         delete axiosInstance.defaults.headers['x-client-id'];
//         delete axiosInstance.defaults.headers['Authorization'];
//     };

//     return { isAuthenticated, userId, loading, login, logout };
// }

// export default useAuth;

'use client'

import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../configs/axios.config';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        const storedUserId = localStorage.getItem('uid');
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedUserId && storedAccessToken && storedRefreshToken) {
            setUserId(storedUserId);
            setIsAuthenticated(true);
            setupAxiosInterceptors();
        }
        setLoading(false);
    }, []);

    const setupAxiosInterceptors = () => {
        axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                    config.headers['x-client-id'] = localStorage.getItem('uid');
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await axiosInstance.post('/refresh-token', { refreshToken });
                        const { accessToken } = response.data;
                        localStorage.setItem('accessToken', accessToken);
                        axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    };

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/signin', { email, password });
            const { tokens,user } = response.data.data;
            
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('uid', user.id);
            
            setUserId(user.id);
            setIsAuthenticated(true);
            
            setupAxiosInterceptors();
            
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('uid');
        setIsAuthenticated(false);
        setUserId(null);
        delete axiosInstance.defaults.headers['x-client-id'];
        delete axiosInstance.defaults.headers['Authorization'];
    };

    return { isAuthenticated, userId, loading, login, logout };
}

export default useAuth;