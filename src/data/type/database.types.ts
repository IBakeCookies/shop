export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attribute_option: {
        Row: {
          attribute_type_id: number
          id: number
        }
        Insert: {
          attribute_type_id: number
          id?: number
        }
        Update: {
          attribute_type_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "attribute_option_attribute_type_id_fkey"
            columns: ["attribute_type_id"]
            isOneToOne: false
            referencedRelation: "attribute_type"
            referencedColumns: ["id"]
          },
        ]
      }
      attribute_option_translation: {
        Row: {
          attribute_option_id: number
          language_code: string
          name: string
        }
        Insert: {
          attribute_option_id: number
          language_code: string
          name: string
        }
        Update: {
          attribute_option_id?: number
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_option_translation_attribute_option_id_fkey"
            columns: ["attribute_option_id"]
            isOneToOne: false
            referencedRelation: "attribute_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attribute_option_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      attribute_type: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      attribute_type_translation: {
        Row: {
          attribute_type_id: number
          language_code: string
          name: string
        }
        Insert: {
          attribute_type_id: number
          language_code: string
          name: string
        }
        Update: {
          attribute_type_id?: number
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_type_translation_attribute_type_id_fkey"
            columns: ["attribute_type_id"]
            isOneToOne: false
            referencedRelation: "attribute_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attribute_type_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      brand: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      brand_translation: {
        Row: {
          brand_id: number
          description: string
          language_code: string
        }
        Insert: {
          brand_id: number
          description: string
          language_code: string
        }
        Update: {
          brand_id?: number
          description?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_translation_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      bucket: {
        Row: {
          created_at: string
          id: number
          name: string
          region: string | null
          storage_provider_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          region?: string | null
          storage_provider_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          region?: string | null
          storage_provider_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bucket_storage_provider_id_fkey"
            columns: ["storage_provider_id"]
            isOneToOne: false
            referencedRelation: "storage_provider"
            referencedColumns: ["id"]
          },
        ]
      }
      care_instruction: {
        Row: {
          code: string
          icon: string
          id: number
        }
        Insert: {
          code: string
          icon: string
          id?: number
        }
        Update: {
          code?: string
          icon?: string
          id?: number
        }
        Relationships: []
      }
      care_instruction_translation: {
        Row: {
          care_instruction_id: number
          instruction: string
          language_code: string
        }
        Insert: {
          care_instruction_id: number
          instruction: string
          language_code: string
        }
        Update: {
          care_instruction_id?: number
          instruction?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_instruction_translation_care_instruction_id_fkey"
            columns: ["care_instruction_id"]
            isOneToOne: false
            referencedRelation: "care_instruction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_instruction_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      cart: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      cart_item: {
        Row: {
          added_at: string
          cart_id: string
          product_variation_id: number
          quantity: number
        }
        Insert: {
          added_at?: string
          cart_id: string
          product_variation_id: number
          quantity: number
        }
        Update: {
          added_at?: string
          cart_id?: string
          product_variation_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_item_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_item_product_variation_id_fkey"
            columns: ["product_variation_id"]
            isOneToOne: false
            referencedRelation: "product_variation"
            referencedColumns: ["id"]
          },
        ]
      }
      color: {
        Row: {
          hex: string
          id: number
        }
        Insert: {
          hex: string
          id?: number
        }
        Update: {
          hex?: string
          id?: number
        }
        Relationships: []
      }
      color_translation: {
        Row: {
          color_id: number
          language_code: string
          name: string
        }
        Insert: {
          color_id: number
          language_code: string
          name: string
        }
        Update: {
          color_id?: number
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_translation_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "color_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      directory: {
        Row: {
          bucket_id: number
          id: number
          path: string
        }
        Insert: {
          bucket_id: number
          id?: number
          path: string
        }
        Update: {
          bucket_id?: number
          id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "directory_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "bucket"
            referencedColumns: ["id"]
          },
        ]
      }
      fabric_type: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      fabric_type_care_instructions: {
        Row: {
          care_instruction_id: number
          fabric_type_id: number
        }
        Insert: {
          care_instruction_id: number
          fabric_type_id: number
        }
        Update: {
          care_instruction_id?: number
          fabric_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fabric_type_care_instructions_care_instruction_id_fkey"
            columns: ["care_instruction_id"]
            isOneToOne: false
            referencedRelation: "care_instruction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fabric_type_care_instructions_fabric_type_id_fkey"
            columns: ["fabric_type_id"]
            isOneToOne: false
            referencedRelation: "fabric_type"
            referencedColumns: ["id"]
          },
        ]
      }
      fabric_type_composition: {
        Row: {
          fabric_type_variation_id: number
          material_id: number
          percentage: number
        }
        Insert: {
          fabric_type_variation_id: number
          material_id: number
          percentage: number
        }
        Update: {
          fabric_type_variation_id?: number
          material_id?: number
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "fabric_type_composition_fabric_type_variation_id_fkey"
            columns: ["fabric_type_variation_id"]
            isOneToOne: false
            referencedRelation: "fabric_type_variation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fabric_type_composition_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
        ]
      }
      fabric_type_features: {
        Row: {
          fabric_type_id: number
          material_feature_id: number
        }
        Insert: {
          fabric_type_id: number
          material_feature_id: number
        }
        Update: {
          fabric_type_id?: number
          material_feature_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fabric_type_features_fabric_type_id_fkey"
            columns: ["fabric_type_id"]
            isOneToOne: false
            referencedRelation: "fabric_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fabric_type_features_material_feature_id_fkey"
            columns: ["material_feature_id"]
            isOneToOne: false
            referencedRelation: "material_feature"
            referencedColumns: ["id"]
          },
        ]
      }
      fabric_type_translation: {
        Row: {
          about: string | null
          fabric_type_id: number
          language_code: string
        }
        Insert: {
          about?: string | null
          fabric_type_id: number
          language_code: string
        }
        Update: {
          about?: string | null
          fabric_type_id?: number
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "fabric_type_translation_fabric_type_id_fkey"
            columns: ["fabric_type_id"]
            isOneToOne: false
            referencedRelation: "fabric_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fabric_type_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
        ]
      }
      fabric_type_variation: {
        Row: {
          fabric_type_id: number
          id: number
          name: string | null
          weight: number | null
          weight_unit_code: string | null
        }
        Insert: {
          fabric_type_id: number
          id?: number
          name?: string | null
          weight?: number | null
          weight_unit_code?: string | null
        }
        Update: {
          fabric_type_id?: number
          id?: number
          name?: string | null
          weight?: number | null
          weight_unit_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fabric_type_variation_fabric_type_id_fkey"
            columns: ["fabric_type_id"]
            isOneToOne: false
            referencedRelation: "fabric_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fabric_type_variation_weight_unit_code_fkey"
            columns: ["weight_unit_code"]
            isOneToOne: false
            referencedRelation: "weight_unit"
            referencedColumns: ["code"]
          },
        ]
      }
      image: {
        Row: {
          alt_text: string
          created_at: string
          directory_id: number
          filename: string
          height: number | null
          id: number
          mime_type: string
          width: number | null
        }
        Insert: {
          alt_text: string
          created_at?: string
          directory_id: number
          filename: string
          height?: number | null
          id?: number
          mime_type: string
          width?: number | null
        }
        Update: {
          alt_text?: string
          created_at?: string
          directory_id?: number
          filename?: string
          height?: number | null
          id?: number
          mime_type?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "image_directory_id_fkey"
            columns: ["directory_id"]
            isOneToOne: false
            referencedRelation: "directory"
            referencedColumns: ["id"]
          },
        ]
      }
      language: {
        Row: {
          code: string
          direction: string
          name: string
        }
        Insert: {
          code: string
          direction: string
          name: string
        }
        Update: {
          code?: string
          direction?: string
          name?: string
        }
        Relationships: []
      }
      material: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      material_care_instructions: {
        Row: {
          care_instruction_id: number
          material_id: number
        }
        Insert: {
          care_instruction_id: number
          material_id: number
        }
        Update: {
          care_instruction_id?: number
          material_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "material_care_instructions_care_instruction_id_fkey"
            columns: ["care_instruction_id"]
            isOneToOne: false
            referencedRelation: "care_instruction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_care_instructions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
        ]
      }
      material_feature: {
        Row: {
          code: string
          icon: string
          id: number
        }
        Insert: {
          code: string
          icon: string
          id?: number
        }
        Update: {
          code?: string
          icon?: string
          id?: number
        }
        Relationships: []
      }
      material_feature_translation: {
        Row: {
          language_code: string
          material_feature_id: number
          name: string
        }
        Insert: {
          language_code: string
          material_feature_id: number
          name: string
        }
        Update: {
          language_code?: string
          material_feature_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_feature_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "material_feature_translation_material_feature_id_fkey"
            columns: ["material_feature_id"]
            isOneToOne: false
            referencedRelation: "material_feature"
            referencedColumns: ["id"]
          },
        ]
      }
      material_features: {
        Row: {
          material_feature_id: number
          material_id: number
        }
        Insert: {
          material_feature_id: number
          material_id: number
        }
        Update: {
          material_feature_id?: number
          material_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "material_features_material_feature_id_fkey"
            columns: ["material_feature_id"]
            isOneToOne: false
            referencedRelation: "material_feature"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_features_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
        ]
      }
      material_translation: {
        Row: {
          language_code: string
          material_id: number
          name: string
        }
        Insert: {
          language_code: string
          material_id: number
          name: string
        }
        Update: {
          language_code?: string
          material_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "material_translation_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
        ]
      }
      material_variation: {
        Row: {
          id: number
          material_id: number
          name: string | null
          weight: number | null
          weight_unit_code: string | null
        }
        Insert: {
          id?: number
          material_id: number
          name?: string | null
          weight?: number | null
          weight_unit_code?: string | null
        }
        Update: {
          id?: number
          material_id?: number
          name?: string | null
          weight?: number | null
          weight_unit_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_variation_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_variation_weight_unit_code_fkey"
            columns: ["weight_unit_code"]
            isOneToOne: false
            referencedRelation: "weight_unit"
            referencedColumns: ["code"]
          },
        ]
      }
      product: {
        Row: {
          brand_id: number | null
          created_at: string
          id: number
          is_published: boolean | null
          product_category_id: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          brand_id?: number | null
          created_at?: string
          id?: number
          is_published?: boolean | null
          product_category_id?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          brand_id?: number | null
          created_at?: string
          id?: number
          is_published?: boolean | null
          product_category_id?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attribute: {
        Row: {
          attribute_option_id: number
          product_id: number
        }
        Insert: {
          attribute_option_id: number
          product_id: number
        }
        Update: {
          attribute_option_id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_attribute_attribute_option_id_fkey"
            columns: ["attribute_option_id"]
            isOneToOne: false
            referencedRelation: "attribute_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attribute_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_care_instructions: {
        Row: {
          care_instruction_id: number
          product_id: number
        }
        Insert: {
          care_instruction_id: number
          product_id: number
        }
        Update: {
          care_instruction_id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_care_instructions_care_instruction_id_fkey"
            columns: ["care_instruction_id"]
            isOneToOne: false
            referencedRelation: "care_instruction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_care_instructions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category: {
        Row: {
          created_at: string
          id: number
          image: string | null
          parent_product_category_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          parent_product_category_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          parent_product_category_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_parent_product_category_id_fkey"
            columns: ["parent_product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category_translation: {
        Row: {
          description: string
          language_code: string
          name: string
          product_category_id: number
        }
        Insert: {
          description: string
          language_code: string
          name: string
          product_category_id: number
        }
        Update: {
          description?: string
          language_code?: string
          name?: string
          product_category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_category_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_category_translation_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_composition: {
        Row: {
          component_id: number
          fabric_type_variation_id: number | null
          material_variation_id: number | null
          percentage: number
          product_id: number
          product_part_id: number
        }
        Insert: {
          component_id?: number
          fabric_type_variation_id?: number | null
          material_variation_id?: number | null
          percentage: number
          product_id: number
          product_part_id: number
        }
        Update: {
          component_id?: number
          fabric_type_variation_id?: number | null
          material_variation_id?: number | null
          percentage?: number
          product_id?: number
          product_part_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_composition_fabric_type_variation_id_fkey"
            columns: ["fabric_type_variation_id"]
            isOneToOne: false
            referencedRelation: "fabric_type_variation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_composition_material_variation_id_fkey"
            columns: ["material_variation_id"]
            isOneToOne: false
            referencedRelation: "material_variation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_composition_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_composition_product_part_id_fkey"
            columns: ["product_part_id"]
            isOneToOne: false
            referencedRelation: "product_part"
            referencedColumns: ["id"]
          },
        ]
      }
      product_feature: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      product_feature_translation: {
        Row: {
          language_code: string
          name: string
          product_feature_id: number
        }
        Insert: {
          language_code: string
          name: string
          product_feature_id: number
        }
        Update: {
          language_code?: string
          name?: string
          product_feature_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_feature_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_feature_translation_product_feature_id_fkey"
            columns: ["product_feature_id"]
            isOneToOne: false
            referencedRelation: "product_feature"
            referencedColumns: ["id"]
          },
        ]
      }
      product_features: {
        Row: {
          product_feature_id: number
          product_id: number
        }
        Insert: {
          product_feature_id: number
          product_id: number
        }
        Update: {
          product_feature_id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_features_product_feature_id_fkey"
            columns: ["product_feature_id"]
            isOneToOne: false
            referencedRelation: "product_feature"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_features_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_image: {
        Row: {
          image_id: number
          product_item_id: number
          sort_order: number
        }
        Insert: {
          image_id: number
          product_item_id: number
          sort_order: number
        }
        Update: {
          image_id?: number
          product_item_id?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_image_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_image_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
        ]
      }
      product_item: {
        Row: {
          color_id: number
          created_at: string
          id: number
          price: number
          product_id: number
          sale_price: number | null
          sku: string
          updated_at: string
        }
        Insert: {
          color_id: number
          created_at?: string
          id?: number
          price: number
          product_id: number
          sale_price?: number | null
          sku: string
          updated_at?: string
        }
        Update: {
          color_id?: number
          created_at?: string
          id?: number
          price?: number
          product_id?: number
          sale_price?: number | null
          sku?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_item_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_part: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      product_part_translation: {
        Row: {
          language_code: string
          name: string
          product_part_id: number
        }
        Insert: {
          language_code: string
          name: string
          product_part_id: number
        }
        Update: {
          language_code?: string
          name?: string
          product_part_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_part_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_part_translation_product_part_id_fkey"
            columns: ["product_part_id"]
            isOneToOne: false
            referencedRelation: "product_part"
            referencedColumns: ["id"]
          },
        ]
      }
      product_translation: {
        Row: {
          about: string | null
          care_instructions: string | null
          description: string
          language_code: string
          name: string
          product_id: number
        }
        Insert: {
          about?: string | null
          care_instructions?: string | null
          description: string
          language_code: string
          name: string
          product_id: number
        }
        Update: {
          about?: string | null
          care_instructions?: string | null
          description?: string
          language_code?: string
          name?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_translation_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variation: {
        Row: {
          created_at: string
          id: number
          product_item_id: number
          size_option_id: number
          stock: number
          updated_at: string
          weight: number
          weight_unit_code: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_item_id: number
          size_option_id: number
          stock: number
          updated_at?: string
          weight: number
          weight_unit_code: string
        }
        Update: {
          created_at?: string
          id?: number
          product_item_id?: number
          size_option_id?: number
          stock?: number
          updated_at?: string
          weight?: number
          weight_unit_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variation_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variation_size_option_id_fkey"
            columns: ["size_option_id"]
            isOneToOne: false
            referencedRelation: "size_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variation_weight_unit_code_fkey"
            columns: ["weight_unit_code"]
            isOneToOne: false
            referencedRelation: "weight_unit"
            referencedColumns: ["code"]
          },
        ]
      }
      rating_type: {
        Row: {
          id: number
          label_max: string | null
          label_min: string | null
          name: string
        }
        Insert: {
          id?: number
          label_max?: string | null
          label_min?: string | null
          name: string
        }
        Update: {
          id?: number
          label_max?: string | null
          label_min?: string | null
          name?: string
        }
        Relationships: []
      }
      review: {
        Row: {
          comment: string
          created_at: string
          date: string
          id: number
          product_id: number
          rating: number
          title: string
        }
        Insert: {
          comment: string
          created_at?: string
          date?: string
          id?: number
          product_id: number
          rating: number
          title: string
        }
        Update: {
          comment?: string
          created_at?: string
          date?: string
          id?: number
          product_id?: number
          rating?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      review_rating_type: {
        Row: {
          rating_type_id: number
          review_id: number
          value: number
        }
        Insert: {
          rating_type_id: number
          review_id: number
          value: number
        }
        Update: {
          rating_type_id?: number
          review_id?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "review_rating_type_rating_type_id_fkey"
            columns: ["rating_type_id"]
            isOneToOne: false
            referencedRelation: "rating_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_rating_type_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
        ]
      }
      size: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      size_category: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      size_category_translation: {
        Row: {
          language_code: string
          name: string
          size_category_id: number
        }
        Insert: {
          language_code: string
          name: string
          size_category_id: number
        }
        Update: {
          language_code?: string
          name?: string
          size_category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "size_category_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "size_category_translation_size_category_id_fkey"
            columns: ["size_category_id"]
            isOneToOne: false
            referencedRelation: "size_category"
            referencedColumns: ["id"]
          },
        ]
      }
      size_option: {
        Row: {
          id: number
          size_category_id: number
          size_id: number
          sort_order: number
        }
        Insert: {
          id?: number
          size_category_id: number
          size_id: number
          sort_order: number
        }
        Update: {
          id?: number
          size_category_id?: number
          size_id?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "size_option_size_category_id_fkey"
            columns: ["size_category_id"]
            isOneToOne: false
            referencedRelation: "size_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "size_option_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "size"
            referencedColumns: ["id"]
          },
        ]
      }
      size_translation: {
        Row: {
          language_code: string
          name: string
          size_id: number
        }
        Insert: {
          language_code: string
          name: string
          size_id: number
        }
        Update: {
          language_code?: string
          name?: string
          size_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "size_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "size_translation_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "size"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_provider: {
        Row: {
          base_url: string
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          base_url: string
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          base_url?: string
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_cart: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      weight_unit: {
        Row: {
          code: string
        }
        Insert: {
          code: string
        }
        Update: {
          code?: string
        }
        Relationships: []
      }
      weight_unit_translation: {
        Row: {
          language_code: string
          name: string
          weight_unit_code: string
        }
        Insert: {
          language_code: string
          name: string
          weight_unit_code: string
        }
        Update: {
          language_code?: string
          name?: string
          weight_unit_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "weight_unit_translation_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "weight_unit_translation_weight_unit_code_fkey"
            columns: ["weight_unit_code"]
            isOneToOne: false
            referencedRelation: "weight_unit"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_similar_products: {
        Args: { current_product_id: number; limit_num: number }
        Returns: {
          product_id: number
          similarity_score: number
          product_slug: string
          product_name: string
        }[]
      }
    }
    Enums: {
      category_type: "hoodies" | "pants" | "shirts" | "accessories"
      claim_reason_enum:
        | "missing_item"
        | "wrong_item"
        | "production_failure"
        | "other"
      order_claim_type_enum: "refund" | "replace"
      order_status_enum:
        | "pending"
        | "completed"
        | "draft"
        | "archived"
        | "canceled"
        | "requires_action"
      return_status_enum:
        | "open"
        | "requested"
        | "received"
        | "partially_received"
        | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      category_type: ["hoodies", "pants", "shirts", "accessories"],
      claim_reason_enum: [
        "missing_item",
        "wrong_item",
        "production_failure",
        "other",
      ],
      order_claim_type_enum: ["refund", "replace"],
      order_status_enum: [
        "pending",
        "completed",
        "draft",
        "archived",
        "canceled",
        "requires_action",
      ],
      return_status_enum: [
        "open",
        "requested",
        "received",
        "partially_received",
        "canceled",
      ],
    },
  },
} as const
