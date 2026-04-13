import { create } from 'zustand';


type CartItem = {
    id: string,
    qty: number,
    options: ItemOption[]
}

type CartState = {
    cart: CartItem[];
    addToCart: (payload: { id: string; qty: number }) => void;
    addOption: (payload: { id: string; idOption: string, qty: number }) => void;
}

type ItemOption = {
    id: string,
    qty: number,
}

const useCartStore = create<CartState>((set) => ({
    options: [],
    cart: [],
    
    addToCart: ({ id, qty }) => {
        set((state) => {
            const check_exist = state.cart.find(item => item.id == id);

            if( check_exist ){
                return {
                    cart: state.cart.map(item => 
                        item.id == id 
                        ? {...item, qty: item.qty + qty}
                        : item
                    )
                }
            }
            return {
                cart: [...state.cart, {id, qty, options: []}]
            };
        });
    },
    addOption: ({ id, idOption, qty = 1 }) => {
        console.log(id, idOption, qty);
        set((state) => {
            return {
                cart: state.cart.map(item => {
                    if( item.id != id ) return item;

                    const option = item.options.find(op => op.id == idOption)
                    if( option ){
                        return {
                            ...item,
                            options: option
                            ? item.options.map(op => 
                                op.id == idOption
                                ? {...op, qty: op.qty+qty}
                                : op
                            )
                            : [...item.options, {id, qty}]
                        }
                    }
                })
            }
        })
    }
}));

export default useCartStore;