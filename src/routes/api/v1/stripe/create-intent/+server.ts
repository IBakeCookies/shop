import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST: RequestHandler = async ({ url }) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'eur',
        // payment_method_types: ['card', 'paypal'],
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return json({
        body: {
            clientSecret: paymentIntent.client_secret,
        },
    });
};
