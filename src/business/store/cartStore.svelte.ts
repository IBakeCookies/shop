import type { Storage } from '@storage/storage';
import type { EventStore } from '@store/eventStore.svelte';
import type { NotificationStore } from '@store/notificationStore.svelte';
import { getContext, setContext } from 'svelte';
import { readProductVariantStockById } from '@data/repository/productRepository';

const CONTEXT_KEY = Symbol();

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    stock: number;
    price: number;
    salePrice: number;
    size: string;
    color: string;
    slug: string;
    image: {
        src: string;
        alt: string;
    };
}

interface addCartItemOutput {
    success: string;
    error: string;
}

interface Config {
    storage: Storage<CartItem[]>;
    notificationStore: NotificationStore;
    eventStore: EventStore;
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class CartStore {
    #storage: Storage<CartItem[]>;
    #notificationStore: NotificationStore;
    #eventStore: EventStore;
    #items = $state<CartItem[]>([]);
    #seen = new Set<number>();
    #totalPrice = $derived.by<number>(() => {
        let total = 0;

        for (const item of this.#items) {
            total += item.price * item.quantity;
        }

        return total;
    });
    #totalItemsCount = $derived.by<number>(() => {
        let total = 0;

        for (const item of this.#items) {
            total += item.quantity;
        }

        return total;
    });

    constructor({ storage, notificationStore, eventStore }: Config) {
        this.#storage = storage;
        this.#notificationStore = notificationStore;
        this.#eventStore = eventStore;
    }

    get items(): CartItem[] {
        return this.#items;
    }

    get totalItemsCount(): number {
        return this.#totalItemsCount;
    }

    get totalPrice(): number {
        return this.#totalPrice;
    }

    hydrateFromStorage(): void {
        const cartStorageItems = this.#storage.read();

        if (!cartStorageItems) {
            return;
        }

        this.#items = cartStorageItems;

        cartStorageItems.forEach((item) => {
            this.#seen.add(item.id);
        });
    }

    // async getCartItem(id: number) {
    // const { data, error } = await readCartItemByVariantId(id);
    // console.log(data);
    // if (!data || error) {
    //     return;
    // }
    // console.log(data);
    // this.#items.push(data);
    // }

    async removeItem(id: number): Promise<void> {
        if (!confirm('Are you sure that you want to remove this item?')) {
            return;
        }

        this.#eventStore.addEvent(`remove-item-from-cart-${id}`);

        await sleep(500);

        this.#items = this.#items.filter((item) => item.id !== id);
        this.#storage.write(this.#items);
        this.#seen.delete(id);

        this.#eventStore.removeEvent(`remove-item-from-cart-${id}`);
    }

    removeAllItems() {
        if (!confirm('Are you sure that you want to remove all items?')) {
            return;
        }

        this.#items = [];
        this.#storage.write(this.#items);
        this.#seen.clear();
    }

    async addItem(item: CartItem) {
        this.#eventStore.addEvent('add-item-to-cart');

        const { success, error } = await this.#addItem(item);

        if (error) {
            this.#notificationStore.addNotification({
                title: error,
                variant: 'warning-light-base',
            });

            this.#eventStore.removeEvent('add-item-to-cart');

            return {
                success,
                error,
            };
        }

        this.#notificationStore.addNotification({
            title: success,
            variant: 'success-light-base',
        });

        this.#eventStore.removeEvent('add-item-to-cart');

        return {
            success,
            error,
        };
    }

    async #addItem(item: CartItem): Promise<addCartItemOutput> {
        const { data, error } = await readProductVariantStockById(item.id);

        if (error) {
            return {
                success: '',
                error: 'Something went wrong.',
            };
        }

        // @sideEffect
        item.stock = data.stock;

        if (item.quantity > item.stock) {
            return {
                success: '',
                error: 'Item is not in stock anymore.',
            };
        }

        if (!this.#seen.has(item.id)) {
            this.#items.push(item);
            this.#seen.add(item.id);
            this.#storage.write(this.#items);

            return {
                success: 'Item added to your cart.',
                error: '',
            };
        }

        for (const cartItem of this.#items) {
            if (cartItem.id !== item.id) {
                continue;
            }

            if (cartItem.quantity + item.quantity > cartItem.stock) {
                return {
                    success: '',
                    error: 'Out of stock.',
                };
            }

            cartItem.quantity += item.quantity;
            this.#storage.write(this.#items);

            return {
                success: 'Item added to your cart.',
                error: '',
            };
        }

        return {
            success: '',
            error: '',
        };
    }

    updateItemQuantity(id: number, quantity: number): void {
        this.#items = this.#items.map((item) => {
            if (item.id !== id) {
                return item;
            }

            item.quantity = quantity;

            return item;
        });

        this.#storage.write(this.#items);
    }

    // validateCart(): void {
    //     for (const item of this.#items) {
    //         if (item.quantity > item.stock) {
    //             this.#notificationStore.addNotification({
    //                 title: 'Item is not in stock anymore.',
    //                 variant: 'warning-light-base',
    //             });
    //         }
    //     }
    // }
}

export function setCartStore(cartStore: CartStore): CartStore {
    return setContext<CartStore>(CONTEXT_KEY, cartStore);
}

export function getCartStore(): CartStore {
    return getContext<CartStore>(CONTEXT_KEY);
}
