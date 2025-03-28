import type { ProductListing } from '@business/type/product/productListing';
import { getContext, setContext } from 'svelte';
import { transformProductApiToProductListing } from '@src/business/transform/productListingTransform';
import { readAllProducts } from '@data/repository/productRepository';

export async function getProducts(): Promise<ProductListing[]> {
    try {
        const { data, error } = await readAllProducts();

        if (!data || error) {
            return [];
        }

        return data.map(transformProductApiToProductListing);
    } catch (error) {
        console.error(error);

        return [];
    }
}

const CONTEXT_KEY = Symbol();

class ProductsStore {
    products: ProductListing[] = $state.raw([]);

    constructor(products?: ProductListing[]) {
        this.products = products || [];
    }

    async getProducts(): Promise<void> {
        const data = await getProducts();

        this.products = data;
    }
}

export function setProductsStore(products?: ProductListing[]) {
    return setContext<ProductsStore>(CONTEXT_KEY, new ProductsStore(products));
}

export function getProductsStore() {
    return getContext<ProductsStore>(CONTEXT_KEY);
}
