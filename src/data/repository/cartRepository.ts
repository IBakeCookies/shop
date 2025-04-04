import type { QueryData } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';

export type ReadCartItemByVariantId = QueryData<ReturnType<typeof readCartItemByVariantId>>;

export const readCartItemByVariantId = (id: number) =>
    supabase
        .from('product_variation')
        .select(
            `
				id,
				stock,
				...product_item (
					price,
					sale_price,
					...color (
						color_translation (name)
					),
					...product (
						product_translation (name)
					)
				),
			
				...size_option_id (
					size (
						size_translation (name)
					)	
				)
			`,
        )
        .eq('id', id)
        .eq('product_item.color.color_translation.language_code', 'en')
        .eq('product_item.product.product_translation.language_code', 'en')
        .eq('product_item.size_option_id.size.size_translation.language_code', 'en')
        .single();

export const createUserCart = () => {
    return supabase.from('user_cart').insert();
};
