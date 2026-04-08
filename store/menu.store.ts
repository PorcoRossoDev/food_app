import { create } from 'zustand';
import api from '../service/api';

type MenuState = {
    menuList: any,
    current_page: number,
    per_page: number,
    total: number,
    fetchMenus: (category: string, keyword: string) => Promise<void>
}

const useMenuStore = create<MenuState>((set) => ({
    menuList: [],
    current_page: 1,
    per_page: 20,
    total: 0,
    fetchMenus: async (category, keyword) => {
        try {
            const res = await api.get(`menus?category=${category}&keyword=${keyword}`);
            set({ menuList: res.data.data });
        } catch (error) {
            console.log('API ERROR:', error); // 👈 bắt buộc log ra
        } finally {
        }
    }
}))

export default useMenuStore