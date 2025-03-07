import type { PageLoad } from './$types';
import { productsStore } from '@store/productsStore.svelte';

export const load: PageLoad = async () => {
    return productsStore.getProducts();
};
