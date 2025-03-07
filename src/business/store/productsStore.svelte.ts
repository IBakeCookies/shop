import type { ReadAllProductsSingleOutput } from '@data/repository/productRepository';
import { readAllProducts } from '@data/repository/productRepository';

interface Product {
    id: number;
    name: string;
    brand: string;
    slug: string;
    price: number;
    salePrice: number;
    image: {
        src: string;
        alt: string;
    };
    colors: string[];
}

const products = $state<Product[]>([]);

function transformProduct(product: ReadAllProductsSingleOutput): Product {
    const name = product.product_translation.at(0)?.name || '';
    const slug = product.slug || '';

    return {
        id: product.id,
        name,
        brand: product.brand || '',
        slug,
        price: product.product_item.at(0)?.price || 0,
        salePrice: product.product_item.find((item) => item.sale_price)?.sale_price || 0,
        image: {
            src: `/${slug}/index.webp`,
            alt: name,
        },
        colors: product.product_item.flatMap((item) => item.color.at(0)?.name || '') || [],
    };
}

export const productsStore = {
    products,

    async getProducts() {
        if (products.length) {
            return;
        }

        const { data, error } = await readAllProducts();

        if (!data || error) {
            return;
        }

        products.push(...data.map(transformProduct));
    },
};
