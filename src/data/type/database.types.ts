export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			attribute_option: {
				Row: {
					attribute_type_id: number;
					id: number;
				};
				Insert: {
					attribute_type_id: number;
					id?: number;
				};
				Update: {
					attribute_type_id?: number;
					id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'attribute_option_attribute_type_id_fkey';
						columns: ['attribute_type_id'];
						isOneToOne: false;
						referencedRelation: 'attribute_type';
						referencedColumns: ['id'];
					}
				];
			};
			attribute_option_translation: {
				Row: {
					attribute_option_id: number;
					language_id: number;
					name: string;
				};
				Insert: {
					attribute_option_id: number;
					language_id: number;
					name: string;
				};
				Update: {
					attribute_option_id?: number;
					language_id?: number;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'attribute_option_translation_attribute_option_id_fkey';
						columns: ['attribute_option_id'];
						isOneToOne: false;
						referencedRelation: 'attribute_option';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'attribute_option_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					}
				];
			};
			attribute_type: {
				Row: {
					id: number;
				};
				Insert: {
					id?: number;
				};
				Update: {
					id?: number;
				};
				Relationships: [];
			};
			attribute_type_translation: {
				Row: {
					attribute_type_id: number;
					language_id: number;
					name: string;
				};
				Insert: {
					attribute_type_id: number;
					language_id: number;
					name: string;
				};
				Update: {
					attribute_type_id?: number;
					language_id?: number;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'attribute_type_translation_attribute_type_id_fkey';
						columns: ['attribute_type_id'];
						isOneToOne: false;
						referencedRelation: 'attribute_type';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'attribute_type_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					}
				];
			};
			brand: {
				Row: {
					id: number;
					name: string;
				};
				Insert: {
					id?: number;
					name: string;
				};
				Update: {
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			brand_translation: {
				Row: {
					brand_id: number;
					description: string;
					language_id: number;
				};
				Insert: {
					brand_id: number;
					description: string;
					language_id: number;
				};
				Update: {
					brand_id?: number;
					description?: string;
					language_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'brand_translation_brand_id_fkey';
						columns: ['brand_id'];
						isOneToOne: false;
						referencedRelation: 'brand';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'brand_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					}
				];
			};
			color: {
				Row: {
					hex: string;
					id: number;
				};
				Insert: {
					hex: string;
					id?: number;
				};
				Update: {
					hex?: string;
					id?: number;
				};
				Relationships: [];
			};
			color_translation: {
				Row: {
					color_id: number;
					language_id: number;
					name: string;
				};
				Insert: {
					color_id: number;
					language_id: number;
					name: string;
				};
				Update: {
					color_id?: number;
					language_id?: number;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'color_translation_color_id_fkey';
						columns: ['color_id'];
						isOneToOne: false;
						referencedRelation: 'color';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'color_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					}
				];
			};
			language: {
				Row: {
					code: string;
					id: number;
					name: string;
				};
				Insert: {
					code: string;
					id?: number;
					name: string;
				};
				Update: {
					code?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			product: {
				Row: {
					brand_id: number | null;
					created_at: string;
					id: number;
					is_published: boolean | null;
					product_category_id: number | null;
					slug: string | null;
					updated_at: string;
				};
				Insert: {
					brand_id?: number | null;
					created_at?: string;
					id?: number;
					is_published?: boolean | null;
					product_category_id?: number | null;
					slug?: string | null;
					updated_at?: string;
				};
				Update: {
					brand_id?: number | null;
					created_at?: string;
					id?: number;
					is_published?: boolean | null;
					product_category_id?: number | null;
					slug?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_brand_id_fkey';
						columns: ['brand_id'];
						isOneToOne: false;
						referencedRelation: 'brand';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_product_category_id_fkey';
						columns: ['product_category_id'];
						isOneToOne: false;
						referencedRelation: 'product_category';
						referencedColumns: ['id'];
					}
				];
			};
			product_attribute: {
				Row: {
					attribute_option_id: number;
					product_id: number;
				};
				Insert: {
					attribute_option_id: number;
					product_id: number;
				};
				Update: {
					attribute_option_id?: number;
					product_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_attribute_attribute_option_id_fkey';
						columns: ['attribute_option_id'];
						isOneToOne: false;
						referencedRelation: 'attribute_option';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_attribute_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['id'];
					}
				];
			};
			product_category: {
				Row: {
					id: number;
					image: string | null;
					parent_product_category_id: number | null;
				};
				Insert: {
					id?: number;
					image?: string | null;
					parent_product_category_id?: number | null;
				};
				Update: {
					id?: number;
					image?: string | null;
					parent_product_category_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'product_category_parent_product_category_id_fkey';
						columns: ['parent_product_category_id'];
						isOneToOne: false;
						referencedRelation: 'product_category';
						referencedColumns: ['id'];
					}
				];
			};
			product_category_translation: {
				Row: {
					description: string;
					language_id: number;
					name: string;
					product_category_id: number;
				};
				Insert: {
					description: string;
					language_id: number;
					name: string;
					product_category_id: number;
				};
				Update: {
					description?: string;
					language_id?: number;
					name?: string;
					product_category_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_category_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_category_translation_product_category_id_fkey';
						columns: ['product_category_id'];
						isOneToOne: false;
						referencedRelation: 'product_category';
						referencedColumns: ['id'];
					}
				];
			};
			product_image: {
				Row: {
					filename: string;
					id: number;
					product_item_id: number;
				};
				Insert: {
					filename: string;
					id?: number;
					product_item_id: number;
				};
				Update: {
					filename?: string;
					id?: number;
					product_item_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_image_product_item_id_fkey';
						columns: ['product_item_id'];
						isOneToOne: false;
						referencedRelation: 'product_item';
						referencedColumns: ['id'];
					}
				];
			};
			product_item: {
				Row: {
					color_id: number;
					created_at: string;
					id: number;
					price: number;
					product_id: number;
					sale_price: number | null;
					sku: string;
					updated_at: string;
				};
				Insert: {
					color_id: number;
					created_at?: string;
					id?: number;
					price: number;
					product_id: number;
					sale_price?: number | null;
					sku: string;
					updated_at?: string;
				};
				Update: {
					color_id?: number;
					created_at?: string;
					id?: number;
					price?: number;
					product_id?: number;
					sale_price?: number | null;
					sku?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_item_color_id_fkey';
						columns: ['color_id'];
						isOneToOne: false;
						referencedRelation: 'color';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_item_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['id'];
					}
				];
			};
			product_translation: {
				Row: {
					about: string;
					care_instructions: string;
					description: string;
					language_id: number;
					name: string;
					product_id: number;
				};
				Insert: {
					about: string;
					care_instructions: string;
					description: string;
					language_id: number;
					name: string;
					product_id: number;
				};
				Update: {
					about?: string;
					care_instructions?: string;
					description?: string;
					language_id?: number;
					name?: string;
					product_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_translation_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['id'];
					}
				];
			};
			product_variation: {
				Row: {
					id: number;
					product_item_id: number;
					size_option_id: number;
					stock: number;
				};
				Insert: {
					id?: number;
					product_item_id: number;
					size_option_id: number;
					stock: number;
				};
				Update: {
					id?: number;
					product_item_id?: number;
					size_option_id?: number;
					stock?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_variation_product_item_id_fkey';
						columns: ['product_item_id'];
						isOneToOne: false;
						referencedRelation: 'product_item';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_variation_size_option_id_fkey';
						columns: ['size_option_id'];
						isOneToOne: false;
						referencedRelation: 'size_option';
						referencedColumns: ['id'];
					}
				];
			};
			rating_type: {
				Row: {
					id: number;
					label_max: string | null;
					label_min: string | null;
					name: string;
				};
				Insert: {
					id?: number;
					label_max?: string | null;
					label_min?: string | null;
					name: string;
				};
				Update: {
					id?: number;
					label_max?: string | null;
					label_min?: string | null;
					name?: string;
				};
				Relationships: [];
			};
			review: {
				Row: {
					comment: string;
					created_at: string;
					date: string;
					id: number;
					product_id: number;
					rating: number;
					title: string;
				};
				Insert: {
					comment: string;
					created_at?: string;
					date?: string;
					id?: number;
					product_id: number;
					rating: number;
					title: string;
				};
				Update: {
					comment?: string;
					created_at?: string;
					date?: string;
					id?: number;
					product_id?: number;
					rating?: number;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'review_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['id'];
					}
				];
			};
			review_rating_type: {
				Row: {
					rating_type_id: number;
					review_id: number;
					value: number;
				};
				Insert: {
					rating_type_id: number;
					review_id: number;
					value: number;
				};
				Update: {
					rating_type_id?: number;
					review_id?: number;
					value?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'review_rating_type_rating_type_id_fkey';
						columns: ['rating_type_id'];
						isOneToOne: false;
						referencedRelation: 'rating_type';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'review_rating_type_review_id_fkey';
						columns: ['review_id'];
						isOneToOne: false;
						referencedRelation: 'review';
						referencedColumns: ['id'];
					}
				];
			};
			size_category: {
				Row: {
					id: number;
				};
				Insert: {
					id?: number;
				};
				Update: {
					id?: number;
				};
				Relationships: [];
			};
			size_category_translation: {
				Row: {
					language_id: number;
					name: string;
					size_category_id: number;
				};
				Insert: {
					language_id: number;
					name: string;
					size_category_id: number;
				};
				Update: {
					language_id?: number;
					name?: string;
					size_category_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'size_category_translation_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'size_category_translation_size_category_id_fkey';
						columns: ['size_category_id'];
						isOneToOne: false;
						referencedRelation: 'size_category';
						referencedColumns: ['id'];
					}
				];
			};
			size_option: {
				Row: {
					id: number;
					size_category_id: number;
					size_reference_id: number;
					sort_order: number;
				};
				Insert: {
					id?: number;
					size_category_id: number;
					size_reference_id: number;
					sort_order: number;
				};
				Update: {
					id?: number;
					size_category_id?: number;
					size_reference_id?: number;
					sort_order?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'size_option_size_category_id_fkey';
						columns: ['size_category_id'];
						isOneToOne: false;
						referencedRelation: 'size_category';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'size_option_size_reference_id_fkey';
						columns: ['size_reference_id'];
						isOneToOne: false;
						referencedRelation: 'size_reference';
						referencedColumns: ['id'];
					}
				];
			};
			size_reference: {
				Row: {
					id: number;
					name: string;
				};
				Insert: {
					id?: number;
					name: string;
				};
				Update: {
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			category_type: 'hoodies' | 'pants' | 'shirts' | 'accessories';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
