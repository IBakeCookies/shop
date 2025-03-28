import type { ProductListing } from '@business/type/product/productListing';
import type { ReadAllProductsSingleOutput } from '@data/repository/productRepository';
import type { Image } from '@presentation/type/image';
import { getImageUrlFromProduct } from '@business/utils/imageUrl';

export function transformProductApiToProductListing(
    product: ReadAllProductsSingleOutput,
): ProductListing {
    const name = product.product_translation.at(0)?.name || '';
    const slug = product.slug || '';

    const image: Image = {
        src: '',
        alt: '',
    };

    for (const item of product.product_item) {
        for (const productImage of item.product_image) {
            if (productImage.sort_order === 1) {
                image.src = getImageUrlFromProduct(productImage);
                image.alt = productImage.alt_text;

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
