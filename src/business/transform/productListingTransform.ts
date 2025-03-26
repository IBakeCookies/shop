import type { ReadAllProductsSingleOutput } from '@data/repository/productRepository';

export interface ProductListing {
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
        isDefault: boolean;
    };
}

export function transformProduct(product: ReadAllProductsSingleOutput): ProductListing {
    const name = product.product_translation.at(0)?.name || '';
    const slug = product.slug || '';
    const image = { src: '', alt: '', isDefault: false };

    for(const item of product.product_item) {
        for(const imageItem of item.product_image) {
            if(imageItem.is_default) {
                image.src = `https://file.garden/Z-Ko2HO6YkiJFqy0/product/${imageItem.filename}`;
                image.alt = name;
                image.isDefault = true;
                break;
            }
        }
    }

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
        image,
    };
}
