import { UserRoute } from "@/api-hub/apiList";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const axiosService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// add AccessToken
axiosService.interceptors.request.use(function (config) {
  const token = Cookies.get("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// Generate a Refresh Token
axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosService.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${UserRoute}/revalidate`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const { accessToken } = response.data;
        Cookies.set("access_token", accessToken);
        axiosService.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosService(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
