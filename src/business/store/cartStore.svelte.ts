import type { CartItem, CartItemInput } from '@business/type/cart/cartItem';
import type { EventStore } from '@store/eventStore.svelte';
import type { NotificationStore } from '@store/notificationStore.svelte';
import * as paraglide from '$lib/paraglide/messages.js';
import { getContext, setContext } from 'svelte';
import { readProductVariantStockById } from '@data/repository/productRepository';
import { createUserCart } from '@data/repository/cartRepository';

const CONTEXT_KEY = Symbol();
interface AddCartItemOutput {
    success: string;
    error: string;
}

interface Config {
    notificationStore: NotificationStore;
    eventStore: EventStore;
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class CartStore {
    #notificationStore: NotificationStore;
    #eventStore: EventStore;
    #items = $state<CartItem[]>([]);
    #availableItems = $derived<CartItem[]>(this.#items.filter((item) => item.isAvailable));
    #disabledItems = $derived<CartItem[]>(this.#items.filter((item) => !item.isAvailable));
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
            if (!item.isAvailable) {
                continue;
            }

            total += item.quantity;
        }

        return total;
    });

    constructor({ notificationStore, eventStore }: Config) {
        this.#notificationStore = notificationStore;
        this.#eventStore = eventStore;
    }

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

    async createCartSession(): Promise<void> {
        try {
            await createUserCart();
        } catch (error) {
            this.#notificationStore.addNotification({
                title: 'Error creating cart session',
                variant: 'warning-light-base',
            });
        }
    }

    hydrateStore(items: CartItem[]): void {
        this.#items = items;

        items.forEach((item) => {
            this.#seen.add(item.id);
        });
    }

    // async getCartItem(id: number) {
    //     const { data, error } = await readCartItemByVariantId(id);
    //     console.log(data);
    //     if (!data || error) {
    //         return;
    //     }
    //     console.log(data);
    //     this.#items.push(data);
    // }

    #removeItem(id: number): void {
        this.#items = this.#items.filter((i) => i.id !== id);
        this.#seen.delete(id);
    }

    async removeItem(id: number): Promise<void> {
        if (!confirm('Are you sure that you want to remove this item?')) {
            return;
        }

        this.#eventStore.addEvent(`remove-item-from-cart-${id}`);

        await sleep(500);

        this.#removeItem(id);

        this.#eventStore.removeEvent(`remove-item-from-cart-${id}`);
    }

    async removeAllItems() {
        if (!confirm('Are you sure that you want to remove all items?')) {
            return;
        }

        this.#eventStore.addEvent('remove-all-cart-items');

        await sleep(1000);

        this.#eventStore.removeEvent('remove-all-cart-items');

        this.#items = [];
        this.#seen.clear();
    }

    async addItem(item: CartItemInput) {
        this.#eventStore.addEvent('add-item-to-cart');

        const { success, error } = await this.#addItem({
            ...item,
            isAvailable: true,
        });

        this.#eventStore.removeEvent('add-item-to-cart');

        if (error) {
            this.#notificationStore.addNotification({
                title: error,
                variant: 'warning-light-base',
            });
        } else {
            this.#notificationStore.addNotification({
                title: success,
                variant: 'success-light-base',
            });
        }

        return {
            success,
            error,
        };
    }

    async #addItem(item: CartItem): Promise<AddCartItemOutput> {
        const { data, error } = await readProductVariantStockById(item.id);

        if (error) {
            return {
                success: '',
                error: 'Something went wrong.',
            };
        }

        // @sideEffect
        this.#items = this.#items.map((cartItem) => {
            if (cartItem.id === item.id) {
                cartItem.stock = data.stock;
            }

            return cartItem;
        });

        if (data.stock === 0) {
            return {
                success: '',
                error: 'Item is out of stock',
            };
        }

        if (!this.#seen.has(item.id)) {
            this.#items.push(item);
            this.#seen.add(item.id);

            return {
                success: paraglide.cart_item_added(),
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
                    error: 'Item is out of stock',
                };
            }

            cartItem.quantity += item.quantity;
            cartItem.isAvailable = true;

            return {
                success: paraglide.cart_item_added(),
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
    }

    #addStockNotification(item: CartItem, type: 'unavailable' | 'limited') {
        const messages = {
            unavailable: `${item.name} - ${item.color} - ${item.size} is not in stock anymore.`,
            limited: `${item.name} - ${item.color} - ${item.size} has lower stock than what you had. We reduced the quantity to the max stock available.`,
        };

        this.#notificationStore.addNotification({
            title: messages[type],
            variant: 'warning-light-base',
            fade: false,
        });
    }

    async validateCart(): Promise<void> {
        try {
            this.#eventStore.addEvent('validate-cart');

            const stockUpdates = await Promise.all(
                this.#items.map(async (item) => {
                    const { data, error } = await readProductVariantStockById(item.id);

                    if (error) {
                        return null;
                    }

                    return data
                        ? {
                              id: item.id,
                              stock: data.stock,
                          }
                        : null;
                }),
            );

            const stockMap = new Map(
                stockUpdates.filter(Boolean).map((update) => [update.id, update.stock]),
            );

            this.#items = this.#items.map((cartItem) => {
                if (!cartItem.isAvailable) {
                    return cartItem;
                }

                const currentStock = stockMap.get(cartItem.id);

                if (currentStock === undefined) {
                    return cartItem;
                }

                cartItem.stock = currentStock;

                if (currentStock === 0) {
                    this.#addStockNotification(cartItem, 'unavailable');

                    return {
                        ...cartItem,
                        quantity: 0,
                        isAvailable: false,
                    };
                }

                if (cartItem.quantity > currentStock) {
                    this.#addStockNotification(cartItem, 'limited');

                    return {
                        ...cartItem,
                        quantity: currentStock,
                    };
                }

                return cartItem;
            });
        } finally {
            this.#eventStore.removeEvent('validate-cart');
        }
    }
}

export function setCartStore(cartStore: CartStore): CartStore {
    return setContext<CartStore>(CONTEXT_KEY, cartStore);
}

export function getCartStore(): CartStore {
    return getContext<CartStore>(CONTEXT_KEY);
}
