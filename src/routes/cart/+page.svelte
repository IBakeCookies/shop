<script lang="ts">
    import type { SubmitFunction } from './$types';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { fly, slide } from 'svelte/transition';
    import { getCartStore } from '@store/cartStore.svelte';
    import { getEventStore } from '@store/eventStore.svelte';
    import { getNotificationStore } from '@store/notificationStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import CartListItem from '@molecule/cartListItem/cartListItem.svelte';
    import Button from '@atom/button/button.svelte';
    import Loader from '@atom/loader/loader.svelte';
    import Money from '@atom/money/money.svelte';

    const cartStore = getCartStore();
    const eventStore = getEventStore();
    const notificationStore = getNotificationStore();

    let isMounted = $state(false);

    const isCheckoutButtonLoading = $derived(eventStore.hasAny(['validate-cart']));
    const isClearCartButtonLoading = $derived(eventStore.hasAny(['remove-all-cart-items']));

    function isDeleteButtonLoading(id: number) {
        return eventStore.hasAny([`remove-item-from-cart-${id}`]);
    }

    function isQuantityButtonLoading(id: number) {
        return eventStore.hasAny([`update-item-quantity-${id}`]);
    }

    async function onCheckout() {
        // await cartStore.validateCart();
        // const res = await fetch('/api/v1/stripe/create-intent', {
        //     method: 'POST',
        //     body: JSON.stringify([]),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        // console.log(res);
    }

    const onRemoveSubmit: SubmitFunction = ({ formData }) => {
        const id = formData.get('id');

        eventStore.addEvent(`remove-item-from-cart-${id}`);

        return async ({ result, update }) => {
            eventStore.removeEvent(`remove-item-from-cart-${id}`);

            update();

            if (result.type === 'success' && result.data) {
                return notificationStore.addNotification({
                    title: result.data.message,
                    variant: 'success-light-base',
                });
            }

            if (result.type === 'failure' && result.data) {
                notificationStore.addNotification({
                    title: result.data.message,
                    variant: 'warning-light-base',
                });
            }
        };
    };

    const onQuantityChangeSubmit: SubmitFunction = ({ formData }) => {
        const id = formData.get('id');
        // const quantity = formData.get('quantity');

        eventStore.addEvent(`update-item-quantity-${id}`);

        return async ({ result, update }) => {
            eventStore.removeEvent(`update-item-quantity-${id}`);

            update();

            if (result.type === 'success' && result.data) {
                return notificationStore.addNotification({
                    title: result.data.message,
                    variant: 'success-light-base',
                });
            }

            if (result.type === 'failure' && result.data) {
                notificationStore.addNotification({
                    title: result.data.message,
                    variant: 'warning-light-base',
                });
            }
        };
    };

    const onRemoveAllItemsSubmit: SubmitFunction = () => {
        eventStore.addEvent('remove-all-cart-items');

        return async ({ update }) => {
            eventStore.removeEvent('remove-all-cart-items');

            update();
        };
    };

    onMount(() => {
        isMounted = true;
    });
</script>

<section
    style="min-height: calc(100vh - {pageStore.alertHeight}px - {pageStore.navHeight}px)"
    in:fly={getFly()}
    class="px-box mx-auto w-full max-w-screen-2xl py-24"
>
    {#if isMounted}
        {#if !cartStore.totalItemsCount && !cartStore.disabledItems.length}
            <div class="text-center">
                <h1 class="mb-6 text-3xl">Cart is empty</h1>

                <Button href="/products">Explore products</Button>
            </div>
        {:else}
            <div class="mt-6 grid grid-cols-1 items-start gap-8 xl:grid-cols-4">
                <div class="col-span-1 xl:col-span-3">
                    <div class="mb-4 flex items-start justify-between">
                        <div>
                            <h1 class="text-h2">Cart</h1>

                            <p>Your cart contains {cartStore.totalItemsCount} items</p>
                        </div>

                        <form
                            class="ml-4 self-end"
                            method="POST"
                            action="?/removeAllItems"
                            use:enhance={onRemoveAllItemsSubmit}
                        >
                            <Button
                                variant="error-light-outline"
                                size="tiny"
                                isLoading={isClearCartButtonLoading}
                            >
                                Clear cart
                            </Button>
                        </form>
                    </div>

                    {#each cartStore.availableItems as item, i (item.id)}
                        <div transition:slide>
                            <CartListItem
                                formActionQuantityChange="?/updateItemQuantity"
                                formActionRemoveItem="?/removeItemFromCart"
                                onRemoveItem={onRemoveSubmit}
                                onQuantityChange={onQuantityChangeSubmit}
                                slug={`/products/${item.slug}`}
                                name={item.name}
                                color={item.color}
                                size={item.size}
                                quantity={item.quantity}
                                salePrice={item.salePrice}
                                price={item.price}
                                stock={item.stock}
                                id={item.id}
                                image={item.image}
                                {isDeleteButtonLoading}
                                {isQuantityButtonLoading}
                                class={{
                                    'border-b': i === cartStore.availableItems.length - 1,
                                }}
                            />
                        </div>
                    {/each}

                    {#if cartStore.disabledItems.length}
                        <h4 class="mt-8 mb-4">
                            Some items are out of stock, so we removed them from your cart.
                        </h4>

                        {#each cartStore.disabledItems as item, i (item.id)}
                            <div transition:slide class="opacity-60">
                                <CartListItem
                                    formActionQuantityChange="?/updateItemQuantity"
                                    formActionRemoveItem="?/removeItemFromCart"
                                    onRemoveItem={onRemoveSubmit}
                                    onQuantityChange={onQuantityChangeSubmit}
                                    slug={`/products/${item.slug}`}
                                    name={item.name}
                                    color={item.color}
                                    size={item.size}
                                    quantity={item.quantity}
                                    salePrice={item.salePrice}
                                    price={item.price}
                                    stock={item.stock}
                                    id={item.id}
                                    image={item.image}
                                    {isDeleteButtonLoading}
                                    {isQuantityButtonLoading}
                                    class={{
                                        'border-b': i === cartStore.disabledItems.length - 1,
                                    }}
                                />
                            </div>
                        {/each}
                    {/if}
                </div>

                <div class="sticky top-30 col-span-1 border border-stone-200 bg-white">
                    <h2 class="p-8 text-xl">Summary</h2>

                    <div class="p-box border-t border-stone-200">
                        <p>Subtotal: <Money value={cartStore.totalPrice} /></p>
                        <p>
                            Shipping will be calculated at checkout (<Money value={4} /> -
                            <Money value={20} />)
                        </p>
                    </div>

                    <p class="p-box border-t border-stone-200 font-bold">
                        Total: <Money value={cartStore.totalPrice} /> + shipping
                    </p>

                    <div class="p-box border-t border-stone-200">
                        <Button
                            class="w-full"
                            variant="success-dark-base"
                            onclick={onCheckout}
                            isLoading={isCheckoutButtonLoading}
                        >
                            Checkout

                            {#snippet onHoverSnippet()}
                                <Icon icon="mdi:arrow-right" />
                            {/snippet}
                        </Button>
                    </div>

                    <div class="px-box border-t border-stone-200 py-4 text-sm text-stone-500">
                        <p>
                            By clicking the button and checking out, you agree to our terms of
                            service.
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    {:else}
        <Loader auto />
    {/if}
</section>
