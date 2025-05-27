import type { CartItem } from '@business/type/cart/cartItem';
import type { ReadCartItem } from '@data/repository/cartRepositoryServer';
import { getImageUrlFromProduct } from '@business/utils/imageUrl';

export function transformCartItemApiToCartItemApp(cartApi: ReadCartItem): CartItem {
    const variation = cartApi.product_variation;
    const image = variation.product_item.product_image.at(0);

    return {
        id: variation.id,
        quantity: cartApi.quantity,
        name: variation.product_item.product.product_translation.at(0)?.name || '',
        stock: variation.stock,
        price: variation.product_item.price,
        salePrice: variation.product_item.sale_price || 0,
        size: variation.size_translation.at(0)?.name || '',
        slug: variation.product_item.product.slug,
        color: variation.product_item.color_translation.at(0)?.name || '',
        image: {
            src: image ? getImageUrlFromProduct(image) : '',
            alt: image?.alt_text || '',
        },
    };
}
