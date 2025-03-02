import type { PageServerLoad } from './$types';
import { $readProductBySlug } from '@data/repository/productRepository';

export const load: PageServerLoad = async ({ params }) => {
	const product = await $readProductBySlug(params.slug);

	return {
		product
	};
};

export const actions = {
	addItemToCart: async ({ cookies, request }) => {
		const data = await request.formData();
	}
};
