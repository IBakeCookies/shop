import type { Actions, PageServerLoad } from './$types';
import { getProduct } from '@store/productStore.svelte';

export const load: PageServerLoad = async ({ params }) => {
    return {
        product: await getProduct(params.slug),
    };
};

export const actions = {
    addItemToCart: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');

        console.log(data);
    },
} satisfies Actions;
