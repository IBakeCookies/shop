import type { PageServerLoad } from './$types';
import { $readProducts } from '@data/repository/productRepository';

export const load: PageServerLoad = async ({ params }) => {
	const products = await $readProducts();

	return {
		products
	};
};
