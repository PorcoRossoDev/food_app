import { create } from 'zustand';
import api from '../service/api';

type Customization = {
    topping: any,
    side: any,
    fetCustomization: () => Promise<void>
}

const useCutomizationStore = create<Customization>((set) => ({
    topping: [],
    side: [],
    fetCustomization: async () => {
        try {
            const res = await api.get('customizations');
            const data = res.data;
            const grouped = data.reduce((acc: any, item: any) => {
                if (!acc[item.type]) {
                    acc[item.type] = [];
                }
                acc[item.type].push(item);
                return acc;
            }, {});
            set({ topping: grouped.topping ?? [], side: grouped.side ?? [] });
        } catch (error) {
            console.log('API ERROR:', error);
        }
    }
}));

export default useCutomizationStore;