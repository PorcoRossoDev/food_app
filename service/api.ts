import useAuthStore from "@/store/auth.store";
import axios, { InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

const api = axios.create({
  baseURL: "http://192.168.1.5:8000/api/", // Thay đổi URL này thành URL của backend của bạn.
  // Nếu bạn chạy trên Android emulator, localhost trên thiết bị là 10.0.2.2, không phải 127.0.0.1.
  // 192.168.1.164 - Home
  // 192.168.1.14 - 192.168.1.5
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("➡️ CALL API:", config.url);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");

      useAuthStore.setState({
        isAuthenticated: false,
        user: null,
      });

      router.replace("/(auth)/sign-in");
      Alert.alert("Có lỗi! Vui lòng đăng nhập lại.");
    }
    return Promise.reject(error);
  },
);

export default api;
