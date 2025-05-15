import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseServer';
import { readProductVariantStockById } from '@data/repository/productRepository';
// import { createCartItem } from '@data/repository/cartRepository';
import { getProduct } from '@store/productStore.svelte';

export const load: PageServerLoad = async ({ params }) => {
    return {
        product: await getProduct(params.slug),
    };
};

export const actions = {
    addItemToCart: async ({ request, cookies }) => {
        const formData = await request.formData();
        const productVariationId = formData.get('productVariationId');
        const cartId = cookies.get('cartId');

        if (!cartId || !productVariationId) {
            return fail(422, {
                message: 'Something went wrong',
                error: 'No cart ID or productVariationId provided',
            });
        }

        const { data: freshProduct, error: freshProductError } = await readProductVariantStockById(
            Number(productVariationId),
        );

        if (freshProductError) {
            return fail(422, {
                message: 'Something went wrong',
                error: freshProductError,
            });
        }

        const freshStock = freshProduct?.stock;

        if (freshStock === 0) {
            return fail(422, {
                message: 'Item is out of stock',
                error: 'Item is out of stock',
            });
        }

        const { data: productInCart, error: productInCartError } = await supabase
            .from('cart_item')
            .select('quantity')
            .eq('cart_id', cartId)
            .eq('product_variation_id', Number(productVariationId))
            .maybeSingle();

        if (productInCartError) {
            return fail(422, {
                message: 'Something went wrong',
                error: productInCartError,
            });
        }

        if (productInCart) {
            if (freshStock < productInCart.quantity + 1) {
                return fail(422, {
                    message: 'Not enough stock',
                    error: 'Not enough stock',
                });
            }

            const { error } = await supabase
                .from('cart_item')
                .update({
                    quantity: productInCart.quantity + 1,
                })
                .eq('cart_id', cartId)
                .eq('product_variation_id', Number(productVariationId));

            if (error) {
                return fail(422, {
                    message: 'Failed to add item',
                    error: error,
                });
            }

            return {
                message: 'Item quantity updated.',
            };
        }

        const { error } = await supabase.from('cart_item').insert({
            cart_id: cartId,
            product_variation_id: Number(productVariationId),
            quantity: 1,
        });

        if (error) {
            return fail(422, {
                message: 'Something went wrong',
                error: error,
            });
        }

        return {
            message: 'Item added to cart.',
        };
    },
} satisfies Actions;
