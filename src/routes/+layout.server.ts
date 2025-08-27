import type { LayoutServerLoad } from './$types';
import type { NotificationInput } from '@store/notificationStore.svelte';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseServer';
import { readCartItems } from '@data/repository/cartRepositoryServer';

interface Notification {
    variant: NotificationInput['variant'];
    message: string;
}

export const load: LayoutServerLoad = async ({ cookies }) => {
    const existingCartId = cookies.get('cartId');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    async function getCartId() {
        if (existingCartId) {
            // fetch it to make sure its still valid, otherwise its expired
            const { data, error } = await supabase
                .from('cart')
                .select('id')
                .eq('id', existingCartId)
                .maybeSingle();

            if (error) {
                console.error('Error fetching cart:', error);

                return;
            }

            if (data) {
                return data.id;
            }

            const { data: newCart, error: cartError } = await supabase
                .from('cart')
                .insert({
                    expires_at: expiresAt,
                })
                .select('id')
                .single();

            if (cartError) {
                console.error('Error creating cart:', error);

                return;
            }

            return newCart.id;
        }

        const { data, error } = await supabase
            .from('cart')
            .insert({
                expires_at: expiresAt,
            })
            .select('id')
            .single();

        if (error) {
            console.error('Error creating cart:', error);

            return;
        }

        return data.id;
    }

    const cartId = await getCartId();

    if (!cartId) {
        return;
    }

    const { error: updateError } = await supabase
        .from('cart')
        .update({
            expires_at: expiresAt,
        })
        .eq('id', cartId);

    if (updateError) {
        console.error('Error updating cart expiration:', updateError);

        return;
    }

    cookies.set('cartId', cartId, {
        path: '/',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    const { data, error } = await readCartItems(cartId);
    const notifications: Notification[] = [];

    if (error) {
        return fail(422, {
            description: 'Something went wrong',
            error: error,
        });
    }

    const cartItems = data.map((item) => {
        const variation = item.product_variation;
        const name = variation.product_item.product.product_translation.at(0)?.name;
        const color = variation.product_item.color_translation.at(0)?.name;
        const size = item.product_variation.size_translation.at(0)?.name;

        if (variation.stock === 0) {
            notifications.push({
                variant: 'error-light-base',
                message: `${name} - ${color} / ${size} is out of stock`,
            });

            return item;
        }

        if (item.quantity > variation.stock) {
            // item.quantity = variation.stock;

            notifications.push({
                variant: 'neutral-light-base',
                message: `${name} - ${color} / ${size} is limited to ${variation.stock} items`,
            });
        }

        return item;
    });

    return {
        cartItems,
        notifications,
    };
};
