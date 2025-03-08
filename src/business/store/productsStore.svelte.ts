import type { ReadAllProductsSingleOutput } from '@data/repository/productRepository';
import { readAllProducts } from '@data/repository/productRepository';

interface Product {
    id: number;
    name: string;
    brand: string;
    slug: string;
    price: number;
    variants: {
        salePrice: number;
        colorName: string;
    }[];
    image: {
        src: string;
        alt: string;
    };
}

class ProductsStore {
    products: Readonly<Product[]> = $state.raw([]);

    async getProducts(): Promise<void> {
        if (this.products.length) {
            return;
        }

        const { data, error } = await readAllProducts();

        if (!data || error) {
            return;
        }

        this.products = data.map(this.transformProduct);
    }

    transformProduct(product: ReadAllProductsSingleOutput): Product {
        const name = product.product_translation.at(0)?.name || '';
        const slug = product.slug || '';

        return {
            id: product.id,
            name,
            brand: product.brand || '',
            slug,
            price: product.product_item.at(0)?.price || 0,
            variants: product.product_item.map((item) => {
                return {
                    salePrice: item.sale_price || 0,
                    colorName: item.color.at(0)?.name || '',
                };
            }),
            image: {
                src: `/${slug}/index.webp`,
                alt: name,
            },
        };
    }
}

export const productsStore = new ProductsStore();
