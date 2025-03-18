import type { PageServerLoad } from './$types';
import { getProducts } from '@store/productsStore.svelte';

export const load: PageServerLoad = async () => {
    return {
        products: await getProducts(),
    };
};
