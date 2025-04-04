import type { RequestHandler } from './$types';
import { loadStripe } from '@stripe/stripe-js';
import { error, json, redirect } from '@sveltejs/kit';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { PUBLIC_FRONTEND_URL } from '$env/static/public';
import Stripe from 'stripe';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST: RequestHandler = async ({ request, url }) => {
    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1R8MeKBC9hnWQxBpsEIljL7F',
                quantity: 2,
            },
            {
                price: 'price_1R8MedBC9hnWQxBpA8aj1FCI',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${PUBLIC_FRONTEND_URL}/cart`,
        cancel_url: `${PUBLIC_FRONTEND_URL}/cart`,
        billing_address_collection: 'required',
        automatic_tax: {
            enabled: true,
        },
        shipping_address_collection: {
            allowed_countries: [
                'DE',
                'FR',
                'IT',
                'ES',
                'AC',
                'AT',
                'BE',
                'BG',
                'HR',
                'CY',
                'CZ',
                'DK',
                'EE',
                'FI',
                'GR',
                'HU',
                'IE',
                'LT',
                'LV',
                'MT',
                'NL',
                'PL',
                'PT',
                'RO',
                'SK',
                'SI',
            ],
        },
    });

    if (!session || !session.url) {
        throw error(500, 'Failed to create checkout session');
    }

    return redirect(303, session.url);

    // return json({
    // body: {
    // clientSecret: paymentIntent.client_secret,
    // },
    // });
};
