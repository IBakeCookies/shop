import { supabase } from '$lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';

// category:product_category_id (
// 	id,
// 	translation:product_category_translation!inner (
// 	  name,
// 	  description
// 	)
//   )

export type ReadAllProductsOutput = QueryData<ReturnType<typeof readAllProducts>>;

export type ReadAllProductsSingleOutput = ReadAllProductsOutput[number];

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
        .eq('product_item.color_id.color_translation.language_id', 1)
        .eq('product_translation.language_id', 1);

// export async function readAllProducts()  {
// 	try {
// 		const response = await supabase
// 			.from('product')
// 			.select(
// 				`
// 				id,
// 				slug,
// 				brand:brand_id (name),
// 				product_item (
// 					id,
// 					price,
// 					sale_price,
// 					color_id (
// 						color_translation (
// 							name
// 						)
// 					)
// 				),
// 				product_translation (
// 					name
// 				)
// 			`
// 			)
// 			.eq('product_item.color_id.color_translation.language_id', 1)
// 			.eq('product_translation.language_id', 1);

// 		// 		// const response = await supabase.from('color').select(`
// 		// 		// 	text_node (
// 		// 		// 		translation (*)
// 		// 		// 	)`).eq('text_node.translation.language_id', 1);

// 		// 		// const response = await supabase
// 		// 		// 	.from('color')
// 		// 		// 	.select(`color_translation (*)`)
// 		// 		// 	.eq('color_translation.language_id', 1);

// 		if (!response.data || response.error) {
// 			return null;
// 		}

// 		return response;
// 	} catch (error) {
// 		console.log('Error loading products');
// 	}
// };

export type ReadProductBySlugOutput = QueryData<ReturnType<typeof readProductBySlug>>;

export const readProductBySlug = (slug: string) =>
    supabase
        .from('product')
        .select(
            `
				id,
				slug,
				product_item (
					id,
					price,
					sale_price,
					...color_id (
						color_id:id,
						color:color_translation (
							name
						)
					),
					product_variation (
						stock,
						...size_option (
							sort_order,
							size_reference (id, name)
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
        .eq('product_item.color_id.color_translation.language_id', 1)
        .eq('product_translation.language_id', 1)
        .eq(
            'product_composition.fabric_type_variation.fabric_type.fabric_type_translation.language_id',
            1,
        )
        .eq(
            'product_composition.fabric_type_variation.fabric_type_composition.material.material_translation.language_id',
            1,
        )
        .eq('slug', slug)
        .single();
