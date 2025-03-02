import { supabase } from '$lib/supabaseClient';

// category:product_category_id (
// 	id,
// 	translation:product_category_translation!inner (
// 	  name,
// 	  description
// 	)
//   )

export async function $readProducts() {
	try {
		const response = await supabase
			.from('product')
			.select(
				`
				id,
				slug,
				brand:brand_id (name),
				product_item (
					id,
					price,
					sale_price,
					color:color_id (
						color_translation (
							name
						)
					)
				),
				product_translation (
					name
				)
			`
			)
			.eq('product_item.color.color_translation.language_id', 1)
			.eq('product_translation.language_id', 1);

		// const response = await supabase.from('color').select(`
		// 	text_node (
		// 		translation (*)
		// 	)`).eq('text_node.translation.language_id', 1);

		// const response = await supabase
		// 	.from('color')
		// 	.select(`color_translation (*)`)
		// 	.eq('color_translation.language_id', 1);

		if (!response.data) {
			return null;
		}

		return response.data;
	} catch (error) {
		console.log('Error loading products');
	}
}

export async function $readProductBySlug(slug: string) {
	try {
		const response = await supabase
			.from('product')
			.select(
				`
				id,
				slug,
				product_item (
					id,
					price,
					sale_price,
					color:color_id (
						id,
						color_translation (
							name
						)
					),
					product_variation (
						stock,
						size_option (
							size_reference (id, name)
						)
					)
				),
				product_translation (
					name,
					description,
					about,
					care_instructions
				)
			`
			)
			.eq('product_item.color.color_translation.language_id', 1)
			.eq('product_translation.language_id', 1)
			.eq('slug', slug);

		if (!response.data) {
			return null;
		}

		return response.data.at(0);
	} catch (error) {
		console.log('Error loading product');
	}
}
