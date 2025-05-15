import type { CartItem } from '@business/type/cart/cartItem';
import type { ReadCartItem } from '@data/repository/cartRepositoryServer';
import { getContext, setContext } from 'svelte';
import { transformCartItemApiToCartItemApp } from '@business/transform/cartItemTransform';

const CONTEXT_KEY = Symbol();

export class CartStore {
    #items = $state<CartItem[]>([]);
    #availableItems = $derived<CartItem[]>(
        this.#items.filter((item) => item.quantity <= item.stock),
    );
    #disabledItems = $derived<CartItem[]>(this.#items.filter((item) => item.quantity > item.stock));
    #totalPrice = $derived.by<number>(() => {
        let total = 0;

        for (const item of this.#items) {
            if (item.quantity <= item.stock) {
                total += item.price * item.quantity;
            }
        }

        return total;
    });
    #totalItemsCount = $derived.by<number>(() => {
        let total = 0;

        for (const item of this.#items) {
            if (item.quantity > item.stock) {
                continue;
            }

            total += item.quantity;
        }

        return total;
    });

    get items(): CartItem[] {
        return this.#items;
    }

    get availableItems(): CartItem[] {
        return this.#availableItems;
    }

    get disabledItems(): CartItem[] {
        return this.#disabledItems;
    }

    get totalItemsCount(): number {
        return this.#totalItemsCount;
    }

    get totalPrice(): number {
        return this.#totalPrice;
    }

    hydrateStore(items: ReadCartItem[]): void {
        this.#items = items.map(transformCartItemApiToCartItemApp);
    }
}

export function setCartStore(cartStore = new CartStore()): CartStore {
    return setContext<CartStore>(CONTEXT_KEY, cartStore);
}

export function getCartStore(): CartStore {
    return getContext<CartStore>(CONTEXT_KEY);
}
