import type { PageLoad } from './$types';
import { productStore } from '@store/productStore.svelte';

export const load: PageLoad = async ({ params }) => {
    return productStore.getProduct(params.slug);
};
