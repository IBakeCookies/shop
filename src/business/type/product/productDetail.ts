import type { ReadProductBySlugOutput } from '@data/repository/productRepository';
import type { Image } from '@presentation/type/image';

export type ProductComposition = ReadProductBySlugOutput['product_composition'][number];

export type ProductVariation =
    ReadProductBySlugOutput['product_item'][number]['product_variation'][number] & {
        colorId: number;
        salePrice: number;
        colorName: string;
    };

export interface ProductSize {
    id: number;
    name: string;
    weight: string;
}

export interface ProductAttribute {
    attribute: string;
    value: string;
}

export interface ProductFeature {
    name: string;
    icon: string;
}

export interface ProductCareInstruction {
    instruction: string;
    icon: string;
}

export interface ProductItem {
    id: number;
    color: {
        id: number;
        name: string;
        hex: string;
    };
    price: number;
    salePrice: number;
    images: Image[];
}

export interface ProductDetail {
    name: string;
    description: string;
    about: string;
    price: number;
    fabricFeatures: ProductFeature[];
    careInstructions: ProductCareInstruction[];
    productComposition: ProductComposition[];
    sizes: ProductSize[];
    attributes: ProductAttribute[];
    items: ProductItem[];
    variations: ProductVariation[];
}
