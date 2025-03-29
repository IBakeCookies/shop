export interface CartItemInput {
    id: number;
    name: string;
    quantity: number;
    stock: number;
    price: number;
    salePrice: number;
    size: string;
    color: string;
    slug: string;
    image: {
        src: string;
        alt: string;
    };
}

export interface CartItem extends CartItemInput {
    isAvailable: boolean;
}
