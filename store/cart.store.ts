import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { create } from 'zustand';


type CartItem = {
    id: string,
    title: string,
    qty: number,
    image: string,
    price: Float,
    options: ItemOption[]
}

type ItemOption = {
    id: string,
    qty: number,
}

type TotalCart = {
    total: number,
    quantity: number,
}

type CartState = {
    cart: CartItem[];
    addToCart: (payload: { id: string; title: string, qty: number, image: string, price: Float }) => void;
    addOption: (payload: { id: string; idOption: string, qty: number }) => void;
    deleteItemCart: (payload: { id: string }) => void;
    updateQty: (payload: { id: string, val: string }) => void;
    getTotalCart: () => void;
    updateBtnQty: (payload: { id: string, type: string }) => void;
}


const useCartStore = create<CartState>((set, get) => ({
    options: [],
    cart: [],

    addToCart: ({ id, title, qty, image, price }) => {
        set((state) => {
            const check_exist = state.cart.find(item => item.id == id);

            if (check_exist) {
                return {
                    cart: state.cart.map(item =>
                        item.id == id
                            ? { ...item, qty: item.qty + qty }
                            : item
                    )
                }
            }
            return {
                cart: [...state.cart, { id, title, qty, image, price, options: [] }]
            };
        });
    },
    updateQty: ({id, val}) => {
        const qty = Number(val) || 0
        set((state) => ({
            cart: state.cart.map(item => item.id === id
                ? {...item, qty}
                : item
            )
        }))
    },
    deleteItemCart: ({ id }) => {
        set((state) => {
            return {
                cart: state.cart.filter(item => item.id != id)
            }
        })
    },
    addOption: ({ id, idOption, qty = 1 }) => {
        set((state) => {
            const existsItem = state.cart.find(item => item.id === id);

            if (!existsItem) {
                return { cart: state.cart };
            }

            const newCart = state.cart.map(item => {
                if (item.id !== id) return item;

                const option = item.options.find(op => op.id === idOption);

                if (option) {
                    return {
                        ...item,
                        options: item.options.map(op =>
                            op.id === idOption
                                ? { ...op, qty: op.qty + qty }
                                : op
                        )
                    };
                }

                return {
                    ...item,
                    options: [...item.options, { id: idOption, qty }]
                };
            });

            return { cart: newCart };
        });
    },
    getTotalCart: () => {
        const cart = get().cart;
        let total = 0;
        let quantity = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            quantity += item.qty;
        })
        return { total, quantity };
    },
    updateBtnQty: ({id, type}) => {
        set((state) => ({
            cart: state.cart.map(item => item.id === id
                ? {...item, qty: (type=='plus') ? item.qty+1 : item.qty-1}
                : item
            )
        }))
    },
}));

export default useCartStore;