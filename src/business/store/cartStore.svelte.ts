import type { Tables } from '@data/type/database.types';

interface CartItem extends Tables<'product'> {
    quantity: number;
}

interface Cart {
    id: string;
    items: Tables<'product'>[];
}

const state = $state<Cart>({
    id: '',
    items: [],
});

export const cartStore = {
    getItems() {
        return state.items;
    },

    addCartItem(item: CartItem) {
        state.items.push(item);
    },

    removeCartItem(itemId: number) {
        state.items = state.items.filter((item) => item.product_id !== itemId);
    },
};
