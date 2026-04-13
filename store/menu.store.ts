import { create } from 'zustand';
import api from '../service/api';

type MenuState = {
    detail: any,
    menuList: any,
    current_page: number,
    per_page: number,
    total: number,
    fetchMenus: (category: string, keyword: string) => Promise<void>
    fetchDetail: (id: string) => Promise<void>
}

const useMenuStore = create<MenuState>((set) => ({
    detail: null,
    menuList: [],
    current_page: 1,
    per_page: 20,
    total: 0,
    fetchMenus: async (category, keyword) => {
        try {
            const res = await api.get(`menus?category=${category}&keyword=${keyword}`);
            set({ menuList: res.data.data });
        } catch (error) {
            console.log('API ERROR:', error);
        } finally {
        }
    },
    fetchDetail: async (id) => {
        try {
            const res = await api.get(`menus/${id}`);
            set({detail: res.data})
        } catch (error) {
            throw new Error("Lỗi!");   
        }
    }
}))

export default useMenuStore