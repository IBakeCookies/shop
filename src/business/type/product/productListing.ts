import type { Image } from '@presentation/type/image';

interface Variant {
    salePrice: number;
    colorName: string;
}

export interface ProductListing {
    id: number;
    name: string;
    brand: string;
    slug: string;
    price: number;
    variants: Variant[];
    image: Image;
}
