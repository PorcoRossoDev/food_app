import { create } from 'zustand';
import api from '../service/api';

type CategoryState = {
    categories: any,
    fetchCategores: () => Promise<void>
}

const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    fetchCategores: async () => {
        try {
            const res = await api.get('categories');
            set({ categories: res.data.data })
        } catch (error) {
            throw error;
        }
    }
}))

export default useCategoryStore