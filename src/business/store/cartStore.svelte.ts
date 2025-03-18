// import type { Tables } from '@data/type/database.types';
import { getContext, setContext } from 'svelte';
import { readProductVariantStockById } from '@data/repository/productRepository';
import { type Storage, LocalStorage } from '@storage/localStorage';

const CONTEXT_KEY = Symbol();

interface CartItem {
    id: number;
    quantity: number;
    stock: number;
}

interface addCartItemOutput {
    success: string | null;
    error: string | null;
}

const cartLocalStorage = new LocalStorage<CartItem[]>('cart');

class CartStore {
    #storage: Storage<CartItem[]>;
    #items = $state<CartItem[]>([]);
    #seen = new Set<number>();
    #totalPrice = $state<number>(0);
    #totalItemsCount = $derived.by<number>(() => {
        let total = 0;

        for (const item of this.#items) {
            total += item.quantity;
        }

        return total;
    });

    constructor(
        initialItems: CartItem[],
        { storage }: { storage: Storage<CartItem[]> },
    ) {
        this.#items = initialItems;
        this.#storage = storage;
    }

    hydrateFromStorage(): void {
        const cartStorageItems = this.#storage.read();

        if (cartStorageItems) {
            this.#items = cartStorageItems;

            cartStorageItems.forEach((item) => {
                this.#seen.add(item.id);
            });
        }
    }

    async addItem(item: CartItem): Promise<addCartItemOutput> {
        const { data, error } = await readProductVariantStockById(item.id);

        if (error) {
            return {
                success: null,
                error: 'Something went wrong.',
            };
        }

        // @sideEffect
        item.stock = data.stock;

        if (item.quantity > item.stock) {
            return {
                success: null,
                error: 'Item is not in stock anymore.',
            };
        }

        if (!this.#seen.has(item.id)) {
            this.#items.push(item);
            this.#seen.add(item.id);
            this.#storage.write(this.#items);

            return {
                success: 'Item added to your cart.',
                error: null,
            };
        }

        for (const cartItem of this.#items) {
            if (cartItem.id !== item.id) {
                continue;
            }

            if (cartItem.quantity + item.quantity > cartItem.stock) {
                return {
                    success: null,
                    error: 'You already have the maximum quantity in your cart.',
                };
            }

            cartItem.quantity += item.quantity;
            this.#storage.write(this.#items);

            return {
                success: 'Item added to your cart.',
                error: null,
            };
        }

        return {
            success: null,
            error: null,
        };
    }

    get items(): CartItem[] {
        return this.#items;
    }

    get totalItemsCount(): number {
        return this.#totalItemsCount;
    }
}

export function setCartStore(
    cartStore = new CartStore([], {
        storage: cartLocalStorage,
    }),
): CartStore {
    return setContext<CartStore>(CONTEXT_KEY, cartStore);
}

export function getCartStore(): CartStore {
    return getContext<CartStore>(CONTEXT_KEY);
}
