import { User } from '@/type';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { create } from 'zustand';
import api from '../service/api';

type AuthState = {
    isAuthenticated: boolean,
    user: User | null,
    isLoading: boolean,
    access_token: string,
    token_type: string,

    setIsAuthenticated: (isAuthenticated: boolean) => void,
    setUser: (user: User | null) => void,
    setLoading: (isLoading: boolean) => void,
    fetchAuthentication: ({ email, password }: { email: string; password: string }) => Promise<void>,
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    access_token: '',
    token_type: '',
    isLoading: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
    fetchAuthentication: async ({ email, password }) => {
        try {
            set({ isLoading: true });
            // Giả sử bạn có một API để kiểm tra trạng thái đăng nhập
            const res = await api.post('login', { email, password })
            if (res.status === 200) {
                const user = res.data.user ?? null;
                set({ 
                    isAuthenticated: true, 
                    user,
                    access_token: res.data.access_token,
                    token_type: res.data.token_type
                });
                await SecureStore.setItemAsync('token', res.data.access_token);
                return user;
            }
            throw new Error('Login failed'); // fallback
        } catch (e: any) {
            const errorMessage = e.response?.data?.message || 'Please check your email and password';
            Alert.alert('Login Failed', errorMessage);
            set({ isAuthenticated: false, user: null });
            throw e; // ✅ Re-throw error để catch block bên ngoài nhận được
        } finally {
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;