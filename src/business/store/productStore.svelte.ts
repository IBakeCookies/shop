import type { ProductDetail } from '@business/type/product/productDetail';
import { getContext, setContext } from 'svelte';
import { transformProductDetailApiToProductDetail } from '@src/business/transform/productDetailTransform';
import { readProductBySlug } from '@data/repository/productRepository';

const placeholder: ProductDetail = {
    name: '',
    description: '',
    fabricFeatures: [],
    productComposition: [],
    about: '',
    sizes: [],
    price: 0,
    attributes: [],
    variations: [],
    careInstructions: [],
    items: [],
};

export async function getProduct(slug: string): Promise<ProductDetail> {
    try {
        const { data, error } = await readProductBySlug(slug);

        console.log(data);

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

    constructor(product?: ProductDetail) {
        this.product = product || placeholder;
    }

    async getProduct(slug: string) {
        const data = await getProduct(slug);

        this.product = data;
    }
}

export function setProductStore(product: ProductDetail) {
    return setContext<ProductStore>(CONTEXT_KEY, new ProductStore(product));
}

export function getProductStore() {
    return getContext<ProductStore>(CONTEXT_KEY);
}
