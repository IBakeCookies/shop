import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseServer';
import { readProductVariantStockById } from '@data/repository/productRepository';

export const actions = {
    updateItemQuantity: async ({ request, cookies }) => {
        const formData = await request.formData();
        const productVariationId = Number(formData.get('id'));
        const quantity = Number(formData.get('quantity'));
        const cartId = cookies.get('cartId');

        if (!cartId || !productVariationId) {
            return fail(422, {
                message: 'Something went wrong',
                error: 'No cart ID or productVariationId provided',
            });
        }

        const { data: freshProduct, error: freshProductError } =
            await readProductVariantStockById(productVariationId);

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
            .eq('product_variation_id', productVariationId)
            .maybeSingle();

        if (productInCartError) {
            return fail(422, {
                message: 'Something went wrong',
                error: productInCartError,
            });
        }

        if (!productInCart) {
            return;
        }

        if (freshStock < quantity) {
            return fail(422, {
                message: 'Not enough stock',
                error: 'Not enough stock',
            });
        }

        const { error } = await supabase
            .from('cart_item')
            .update({
                quantity,
            })
            .eq('cart_id', cartId)
            .eq('product_variation_id', productVariationId);

        if (error) {
            return fail(422, {
                message: 'Failed to add item',
                error: error,
            });
        }

        return {
            message: 'Item quantity updated.',
        };
    },

    removeItemFromCart: async ({ request, cookies }) => {
        const formData = await request.formData();
        const product_variation_id = Number(formData.get('id'));
        const cartId = cookies.get('cartId');

        if (!cartId || !product_variation_id) {
            return fail(422, {
                message: 'Something went wrong',
                error: 'No cart ID or productVariationId provided',
            });
        }

        const { error } = await supabase
            .from('cart_item')
            .delete()
            .eq('cart_id', cartId)
            .eq('product_variation_id', product_variation_id);

        if (error) {
            return fail(422, {
                message: 'Failed to remove item',
                error: error,
            });
        }
    },

    removeAllItems: async ({ cookies }) => {
        const cartId = cookies.get('cartId');

        if (!cartId) {
            return fail(422, {
                message: 'Something went wrong',
                error: 'No cart ID provided',
            });
        }

        const { error } = await supabase.from('cart_item').delete().eq('cart_id', cartId);

        if (error) {
            return fail(422, {
                message: 'Failed to clear cart',
                error: error,
            });
        }

        cookies.delete('cartId', {
            path: '/',
        });
    },
} satisfies Actions;
