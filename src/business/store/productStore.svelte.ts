import type { ReadProductBySlugOutput } from '@data/repository/productRepository';
import { readProductBySlug } from '@data/repository/productRepository';

type ProductComposition = ReadProductBySlugOutput['product_composition'][number];

interface ProductColor {
    id: number;
    name: string;
    salePrice: number;
}

interface ProductSize {
    id: number;
    name: string;
}

interface ProductVariations {
    [key: string]: unknown;
}

class ProductStore {
    product = $state.raw({
        name: '',
        description: '',
        careInstructions: '',
        fabricCareInstructions: [] as string[],
        fabricFeatures: [] as string[],
        productComposition: [] as ProductComposition[],
        about: '',
        image: {
            src: '',
            alt: '',
        },
        colors: [] as ProductColor[],
        sizes: [] as ProductSize[],
        price: 0,
        variations: {} as ProductVariations,
    });

    constructor(data = this.product) {
        Object.assign(this.product, data);
    }

    async getProduct(slug: string) {
        const { data, error } = await readProductBySlug(slug);

        if (!data || error) {
            return;
        }

        console.log({
            data,
        });

        const name = data.product_translation.at(0)?.name || '';

        const fabricCareInstructions = [
            ...new Set(
                data.product_composition.map(
                    (composition) =>
                        composition.fabric_type_variation?.fabric_type?.fabric_type_translation?.at(
                            0,
                        )?.care_instructions || '',
                ) || [''],
            ),
        ];

        this.product = {
            name,
            description: data.product_translation.at(0)?.description || '',
            careInstructions: data.product_translation.at(0)?.care_instructions || '',
            fabricCareInstructions,
            fabricFeatures: this.getFabricFeatures(data),
            productComposition: data.product_composition,
            about: data.product_translation.at(0)?.about || '',
            image: {
                src: `/${data.slug}/index.webp`,
                alt: name,
            },
            colors: this.getColors(data),
            sizes: this.getSizes(data),
            price: data.product_item.at(0)?.price || 0,
            variations: this.getVariations(data),
        };
    }

    private getColors(product: ReadProductBySlugOutput) {
        return product.product_item
            .map((item) => ({
                id: item.color_id,
                name: item.color.at(0)?.name || '',
                salePrice: item.sale_price || 0,
            }))
            .sort((a, b) => `${a.name}`.localeCompare(b.name));
    }

    private getSizes(product: ReadProductBySlugOutput) {
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

    private getVariations(product: ReadProductBySlugOutput) {
        return product.product_item.reduce((acc, item) => {
            const colorId = item.color_id;

            const sizes = item.product_variation.reduce((acc, variation) => {
                const sizeId = variation.size_reference.id;

                // @ts-ignore
                acc[sizeId] = variation.stock;

                return acc;
            }, {});

            // @ts-ignore
            acc[colorId] = sizes;

            return acc;
        }, {});
    }

    private getFabricFeatures(product: ReadProductBySlugOutput) {
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

                const feature = featureItem.material_feature_translation.at(0)?.name;

                result.push(feature || '');
            }
        }

        return result;
    }
}

export const productStore = new ProductStore();
