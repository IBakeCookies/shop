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
    careInstructions: string;
    fabricCareInstructions: string[];
    fabricFeatures: ProductFeature[];
    productComposition: ProductComposition[];
    about: string;
    sizes: ProductSize[];
    price: number;
    attributes: ProductAttribute[];
    items: ProductItem[];
    variations: ProductVariation[];
}
