import type { ReadProductBySlugOutput } from '@data/repository/productRepository';

type ProductComposition =
    ReadProductBySlugOutput['product_composition'][number];
type ProductVariation =
    ReadProductBySlugOutput['product_item'][number]['product_variation'][number] & {
        colorId: number;
        salePrice: number;
        colorName: string;
    };

interface ProductColor {
    id: number;
    name: string;
    salePrice: number;
    hex: string;
}

interface ProductSize {
    id: number;
    name: string;
}

interface Attribute {
    attribute: string;
    value: string;
}

export interface ProductDetail {
    name: string;
    description: string;
    careInstructions: string;
    fabricCareInstructions: string[];
    fabricFeatures: string[];
    productComposition: ProductComposition[];
    about: string;
    image: {
        src: string;
        alt: string;
    };
    colors: ProductColor[];
    sizes: ProductSize[];
    price: number;
    attributes: Attribute[];
    productVariation: ProductVariation[];
}

export function transformProductDetailApiToProductDetail(
    product: ReadProductBySlugOutput,
): ProductDetail {
    const name = product.product_translation.at(0)?.name || '';

    const fabricCareInstructions = [
        ...new Set(
            product.product_composition.map(
                (composition) =>
                    composition.fabric_type_variation?.fabric_type?.fabric_type_translation?.at(
                        0,
                    )?.care_instructions || '',
            ) || [''],
        ),
    ];

    return {
        name,
        description: product.product_translation.at(0)?.description || '',
        careInstructions:
            product.product_translation.at(0)?.care_instructions || '',
        fabricCareInstructions,
        fabricFeatures: getFabricFeatures(product),
        productComposition: product.product_composition,
        about: product.product_translation.at(0)?.about || '',
        image: {
            src: `/${product.slug}/index.webp`,
            alt: name,
        },
        colors: getColors(product),
        attributes: getAttributes(product),
        sizes: getSizes(product),
        price: product.product_item.at(0)?.price || 0,
        productVariation: product.product_item
            .map((item) => {
                return item.product_variation.map((element) => {
                    return {
                        ...element,
                        colorId: item.color_id,
                        salePrice: item.sale_price || 0,
                        colorName: item.color.at(0)?.name || '',
                    };
                });
            })
            .flat(),
    };
}

function getAttributes(product: ReadProductBySlugOutput): Attribute[] {
    return product.attribute_option.map((option) => ({
        attribute: option.attribute_type_translation.at(0)?.name || '',
        value: option.attribute_option_translation.at(0)?.name || '',
    }));
}

function getColors(product: ReadProductBySlugOutput): ProductColor[] {
    return product.product_item
        .map((item) => ({
            id: item.color_id,
            name: item.color.at(0)?.name || '',
            salePrice: item.sale_price || 0,
            hex: item.hex,
        }))
        .sort((a, b) => `${a.name}`.localeCompare(b.name));
}

function getSizes(product: ReadProductBySlugOutput): ProductSize[] {
    const seen = new Set();
    const result: ProductSize[] = [];

    for (const item of product.product_item) {
        for (const variation of item.product_variation) {
            const sizeName = variation.size_reference.name;

            if (!seen.has(sizeName)) {
                seen.add(sizeName);

                result.push({
                    id: variation.size_reference.id,
                    name: sizeName,
                });
            }
        }
    }

    return result.sort((a, b) => a.id - b.id);
}

function getFabricFeatures(product: ReadProductBySlugOutput): string[] {
    const result: string[] = [];

    for (let i = 0; i < product.product_composition.length; i++) {
        const composition = product.product_composition.at(i);

        if (!composition) {
            return result;
        }

        const variation = composition.fabric_type_variation;

        if (!variation) {
            return result;
        }

        const features = variation.fabric_type?.fabric_type_features;

        if (!features) {
            return result;
        }

        for (let j = 0; j < features.length; j++) {
            const featureItem = features.at(j);

            if (!featureItem) {
                continue;
            }

            const feature =
                featureItem.material_feature_translation.at(0)?.name;

            result.push(feature || '');
        }
    }

    return result;
}
