import { supabase } from '$lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';

export type ReadCartItems = QueryData<ReturnType<typeof readCartItems>>;

export const readCartItems = () =>
    supabase
        .from('product')
        .select(
            `
				id,
				...brand_id (brand:name),
				product_item (
					id,
					price,
					sale_price,
				),
				product_translation (
					name
				)
			`,
        )
        .eq('product_translation.language_code', 'en');
