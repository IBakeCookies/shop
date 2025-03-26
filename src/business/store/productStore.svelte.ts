import type { ProductDetail } from '@business/transform/productDetailTransform';
import { getContext, setContext } from 'svelte';
import { transformProductDetailApiToProductDetail } from '@src/business/transform/productDetailTransform';
import { readProductBySlug } from '@data/repository/productRepository';

const placeholder: ProductDetail = {
    name: '',
    description: '',
    careInstructions: '',
    fabricCareInstructions: [],
    fabricFeatures: [],
    productComposition: [],
    about: '',
    sizes: [],
    price: 0,
    attributes: [],
    productVariation: [],
    items: [],
};

export async function getProduct(slug: string): Promise<ProductDetail> {
    try {
        const { data, error } = await readProductBySlug(slug);

        if (!data || error) {
            return placeholder;
        }

        return transformProductDetailApiToProductDetail(data);
    } catch (err) {
        console.error(err);

        return placeholder;
    }
}

const CONTEXT_KEY = Symbol();

class ProductStore {
    product = $state.raw<ProductDetail>(placeholder);

    async getProduct(slug: string) {
        const data = await getProduct(slug);

        this.product = data;
    }
}

export function setProductStore() {
    return setContext<ProductStore>(CONTEXT_KEY, new ProductStore());
}

export function getProductStore() {
    return getContext<ProductStore>(CONTEXT_KEY);
}
