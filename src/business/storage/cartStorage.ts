import type { CartItem } from '@store/cartStore.svelte';
import { CreateStorage } from '@storage/storage';

export const cartLocalStorage = new CreateStorage<CartItem[]>('cart', () => localStorage);
