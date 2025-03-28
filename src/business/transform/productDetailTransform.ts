import type {
    ProductAttribute,
    ProductDetail,
    ProductFeature,
    ProductItem,
    ProductSize,
} from '@business/type/product/productDetail';
import type { ReadProductBySlugOutput } from '@data/repository/productRepository';
import { getImageUrlFromProduct } from '@business/utils/imageUrl';

export function transformProductDetailApiToProductDetail(
    product: ReadProductBySlugOutput,
): ProductDetail {
    const name = product.product_translation.at(0)?.name || '';

    const fabricCareInstructions = [
        ...new Set(
            product.product_composition.map(
                (composition) =>
                    composition.fabric_type_variation?.fabric_type?.fabric_type_translation?.at(0)
                        ?.care_instructions || '',
            ) || [''],
        ),
    ];

    return {
        name,
        description: product.product_translation.at(0)?.description || '',
        about: product.product_translation.at(0)?.about || '',
        careInstructions: product.product_translation.at(0)?.care_instructions || '',
        fabricCareInstructions,
        attributes: getAttributes(product),
        fabricFeatures: getFabricFeatures(product),
        productComposition: product.product_composition,
        sizes: getSizes(product),
        price: product.product_item.at(0)?.price || 0,
        items: getItems(product),
        variations: product.product_item
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

function getItems(product: ReadProductBySlugOutput): ProductItem[] {
    return product.product_item.map((item) => {
        return {
            id: item.id,
            color: {
                id: item.color_id,
                name: item.color.at(0)?.name || '',
                hex: item.hex,
            },
            price: item.price,
            salePrice: item.sale_price || 0,
            images: item.product_image
                .map((image) => {
                    return {
                        src: getImageUrlFromProduct(image),
                        alt: image.alt_text,
                        sortOrder: image.sort_order,
                    };
                })
                .sort((a, b) => a.sortOrder - b.sortOrder),
        };
    });
}

function getAttributes(product: ReadProductBySlugOutput): ProductAttribute[] {
    return product.attribute_option.map((option) => ({
        attribute: option.attribute_type_translation.at(0)?.name || '',
        value: option.attribute_option_translation.at(0)?.name || '',
    }));
}

function getSizes(product: ReadProductBySlugOutput): ProductSize[] {
    const seen = new Set();
    const result: ProductSize[] = [];

    for (const item of product.product_item) {
        for (const variation of item.product_variation) {
            const sizeName = variation.size.size_translation.at(0)?.name || '';

            if (!seen.has(sizeName)) {
                seen.add(sizeName);

                result.push({
                    id: variation.size.id,
                    name: sizeName,
                    weight: `${variation.weight}${variation.weight_unit_code}`,
                });
            }
        }
    }

    return result.sort((a, b) => a.id - b.id);
}

function getFabricFeatures(product: ReadProductBySlugOutput): ProductFeature[] {
    const result: ProductFeature[] = [];

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

            const feature = featureItem.material_feature_translation.at(0)?.name;

            result.push({
                name: feature || '',
                icon: featureItem.icon,
            });
        }
    }

    return result;
}
