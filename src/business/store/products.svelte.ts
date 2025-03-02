import type { Tables } from '@data/type/database.types';

interface Cart {
	id: string;
	items: Tables<'product'>[];
}

const state = $state<Cart>({
	id: '',
	items: []
});

export const productStore = {
	addCartItem(item: Tables<'product'>) {
		state.items.push(item);
	},

	removeCartItem(itemId: number) {
		state.items = state.items.filter((item) => item.product_id !== itemId);
	}
};
