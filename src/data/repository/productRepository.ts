import type { QueryData } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';

export type ReadAllProductsOutput = QueryData<ReturnType<typeof readAllProducts>>;

export type ReadAllProductsSingleOutput = ReadAllProductsOutput[number];

export type ReadProductBySlugOutput = QueryData<ReturnType<typeof readProductBySlug>>;

export type ReadProductVariantStockById = QueryData<ReturnType<typeof readProductVariantStockById>>;

// export const readSimilarProducts = (id: number) =>
// supabase.rpc('get_similar_products', {
//     current_product_id: id,
//     limit_num: 6,
// });

export const readAllProducts = () =>
    supabase
        .from('product')
        .select(
            `
				id,
				slug,
				...brand_id (brand:name),
				product_item (
					id,
					price,
					sale_price,
					...color_id (
						color:color_translation (
							name
						)
					)
				),
				product_translation (
					name
				)
			`,
        )
        .eq('product_item.color_id.color_translation.language_code', 'en')
        .eq('product_translation.language_code', 'en')
        .eq('is_published', true);

export const readProductBySlug = (slug: string) =>
    supabase
        .from('product')
        .select(
            `
				id,
				slug,
				attribute_option (
					attribute_option_translation (
						name
					),
					...attribute_type (
						attribute_type_translation (
							name
						)
					)
				),
				product_item (
					id,
					price,
					sale_price,
					...color_id (
						hex,
						color_id:id,
						color:color_translation (
							name
						)
					),
					product_variation (
						id,
						stock,
						...size_option (
							sort_order,
							size (
								id,
								size_translation (
									name
								)
							)
						)
					)
				),
				product_translation (
					name,
					description,
					about,
					care_instructions
				),
				product_composition (
					percentage,
					...product_part (
						product_part_translation (
							name
						)
					),
					fabric_type_variation (
						weight,
						name,
						fabric_type_composition (
							percentage,
							...material (
								material_translation (
									name
								)
							)
						),
						fabric_type (
							name,
							fabric_type_translation (
								care_instructions
							),	
							fabric_type_features (
								...material_feature (
									material_feature_translation (name)
								)
							)
						)
					)
				)
			`,
        )
        .eq('product_item.color_id.color_translation.language_code', 'en')
        .eq('product_translation.language_code', 'en')
        .eq(
            'product_composition.fabric_type_variation.fabric_type.fabric_type_translation.language_code',
            'en',
        )
        .eq(
            'product_composition.fabric_type_variation.fabric_type_composition.material.material_translation.language_code',
            'en',
        )
        .eq('attribute_option.attribute_option_translation.language_code', 'en')
        .eq('attribute_option.attribute_type.attribute_type_translation.language_code', 'en')
        .eq('product_item.product_variation.size_option.size.size_translation.language_code', 'en')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

export const readProductVariantStockById = (id: number) =>
    supabase.from('product_variation').select('stock').eq('id', id).single();
