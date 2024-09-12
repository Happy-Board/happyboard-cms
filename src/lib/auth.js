"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "../configs/axios.config";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const redirectToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("uid");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUserId == 1 && storedAccessToken && storedRefreshToken) {
      setUid(storedUserId);
      setIsAuthenticated(true);
      setupAxiosInterceptors();
    } else {
      redirectToLogin();
    }
    setLoading(false);
  }, []);

  const setupAxiosInterceptors = () => {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["x-client-id"] = localStorage.getItem("uid");
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
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axiosInstance.post("/refresh", {
              refreshToken,
              uid,
            });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            axiosInstance.defaults.headers[
              "Authorization"
            ] = `Bearer ${accessToken}`;
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
      const response = await axiosInstance.post("/signin", { email, password });
      const { tokens, user } = response.data.data;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("uid", user.id);

      setUid(user.id);
      setIsAuthenticated(true);

      setupAxiosInterceptors();

      return user.id;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uid");
    setIsAuthenticated(false);
    setUid(null);
    delete axiosInstance.defaults.headers["x-client-id"];
    delete axiosInstance.defaults.headers["Authorization"];
    redirectToLogin();
  };

  return { isAuthenticated, uid, loading, login, logout };
};

export default useAuth;
