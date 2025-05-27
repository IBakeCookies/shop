import type { QueryData } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseServer';

export type ReadCartItemsOutput = QueryData<ReturnType<typeof readCartItems>>;

export type ReadCartItem = ReadCartItemsOutput[number];

export const readCartItems = (cartId: string) =>
    supabase
        .from('cart_item')
        .select(
            `
            quantity,
            product_variation (
                id,
                stock,
                ...size_option_id (
                    ...size (
                        size_translation (
                            name
                        )
                    )
                ),
                product_item (
                    price,  
                    sale_price,
                    ...color (
                        color_translation (
                            name
                        )
                    ),
                    product (
                        slug,
                        product_translation (
                            name
                        )
                    ),
                    product_image (
                        sort_order,
                        ...image_id (
                            filename,
                            alt_text,
                            mime_type,
                            ...directory_id (
                                path,
                                bucket_id (
                                    name,
                                    ...storage_provider_id (
                                        base_url
                                    )
                                )
                            )
                        )
                    )
                )
            )
        `,
        )

        .eq('cart_id', cartId)
        .eq('product_variation.product_item.color.color_translation.language_code', 'en')
        .eq('product_variation.size_option_id.size.size_translation.language_code', 'en')
        .eq('product_variation.product_item.product.product_translation.language_code', 'en')
        .order('product_variation(id)', {
            ascending: true,
        });
