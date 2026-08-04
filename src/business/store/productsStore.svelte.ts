import type { ProductListing } from '@business/type/product/productListing';
import { getContext, setContext } from 'svelte';
import { transformProductApiToProductListing } from '@src/business/transform/productListingTransform';
import { readAllProducts } from '@data/repository/productRepository';

export async function getProducts(
    input = {
        from: 0,
        to: 20,
    },
): Promise<ProductListing[]> {
    try {
        const { data, error } = await readAllProducts(input);

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
    #isAllLoaded = $state(false);
    #size = 3;
    #start = 4;
    #end = this.#start + this.#size - 1;

    constructor(products?: ProductListing[]) {
        this.products = products || [];
    }

    get isAllLoaded(): boolean {
        return this.#isAllLoaded;
    }

    async getProducts(): Promise<void> {
        const products = await getProducts({
            from: this.#start,
            to: this.#end,
        });

        if (products.length < this.#size) {
            this.#isAllLoaded = true;
        }

        this.products = [... this.products, ...products];
        this.#start += this.#size;
        this.#end += this.#size;  
    }
}

export function setProductsStore(products?: ProductListing[]) {
    return setContext<ProductsStore>(CONTEXT_KEY, new ProductsStore(products));
}

export function getProductsStore() {
    return getContext<ProductsStore>(CONTEXT_KEY);
}
