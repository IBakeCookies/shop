import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';
import { getProducts } from '@store/productsStore.svelte';

(async () => {
    const stripe = new Stripe(SECRET_STRIPE_KEY);
    const data = await getProducts();

    data.forEach((product) => {
        stripe.products.create({
            id: product.id.toString(),
            name: product.name,
            // description: product.description,
            // images: product.images,
            metadata: {
                slug: product.slug,
                price: product.price.toString(),
                // category: product.category,
                brand: product.brand,
            },
        });
    });
})();
