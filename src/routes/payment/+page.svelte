<script lang="ts">
    import type { Stripe } from '@stripe/stripe-js';
    import { loadStripe } from '@stripe/stripe-js';
    import { goto } from '$app/navigation';
    import { PUBLIC_STRIPE_KEY } from '$env/static/public';
    import { onMount } from 'svelte';
    import { Elements, PaymentElement } from 'svelte-stripe';

    let stripe: Stripe | null = $state(null);
    let clientSecret: string = $state('');
    let elements = $state(null);
    let processing = $state(false);
    let error = $state(null);

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY);

        fetch('/api/v1/stripe/create-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        id: 'xl-tshirt',
                        quantity: 1,
                    },
                ],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                clientSecret = data?.clientSecret;
            });
    });

    async function submit() {
        // avoid processing duplicates
        if (processing) return;

        processing = true;

        if (!elements) {
            return;
        }

        // confirm payment with stripe
        const result = await stripe?.confirmPayment({
            elements,
        });

        // log results, for debugging
        console.log({
            result,
        });

        if (!result) {
            return;
        }

        if (result.error) {
            // payment failed, notify user
            error = result.error;

            processing = false;
        } else {
            // payment succeeded, redirect to "thank you" page
            goto('/examples/payment-element/thanks');
        }
    }
</script>

<!-- <Elements {stripe}></Elements> -->

{#if clientSecret}
    <Elements
        {stripe}
        {clientSecret}
        theme="flat"
        labels="floating"
        variables={{
            colorPrimary: '#7c4dff',
        }}
        rules={{
            '.Input': {
                border: 'solid 1px #0002',
            },
        }}
        bind:elements
    >
        <form onsubmit={submit}>
            <PaymentElement />

            <button disabled={processing}>
                {#if processing}
                    Processing...
                {:else}
                    Pay
                {/if}
            </button>
        </form>
    </Elements>
{:else}
    Loading...
{/if}
