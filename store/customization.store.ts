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
            const data = res.data.data;
            const topping = data.filters((item: any) => item.type == 'topping');
            const side = data.filters((item: any) => item.type == 'side');
            set({ topping: topping, side: side });
            console.log(topping, side, data);
        } catch (error) {
            console.log('API ERROR:', error);
        }
    }
}));

export default useCutomizationStore;