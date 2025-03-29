import type { CartItem } from '@business/type/cart/cartItem';
import { CreateStorage } from '@storage/storage';

export const cartLocalStorage = new CreateStorage<CartItem[]>('revar-cart', () => localStorage);
