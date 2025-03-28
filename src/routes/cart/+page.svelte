<script lang="ts">
    import Icon from '@iconify/svelte';
    import { fly, slide } from 'svelte/transition';
    import { getCartStore } from '@store/cartStore.svelte';
    import { getEventStore } from '@store/eventStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import CartListItem from '@molecule/cartListItem/cartListItem.svelte';
    import Button from '@atom/button/button.svelte';
    import Loader from '@atom/loader/loader.svelte';
    import Money from '@atom/money/money.svelte';

    const cartStore = getCartStore();
    const eventStore = getEventStore();
    const isCartReady = $derived(!eventStore.hasAny(['cartStore.hydration']));
    const isDeleteButtonLoading = (id: number) => {
        return eventStore.hasAny([`remove-item-from-cart-${id}`]);
    };

    $inspect(cartStore.items);
</script>

<section
    style="min-height: calc(100vh - {pageStore.alertHeight}px - {pageStore.navHeight}px)"
    in:fly={getFly()}
    class="px-box mx-auto w-full max-w-screen-2xl py-24"
>
    {#if isCartReady}
        {#if !cartStore.totalItemsCount}
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

                        <Button
                            variant="error-light-outline"
                            size="tiny"
                            class="ml-4 self-end"
                            onclick={() => cartStore.removeAllItems()}
                        >
                            Clear cart
                        </Button>
                    </div>

                    {#each cartStore.items as item, i (item.id)}
                        <div transition:slide>
                            <CartListItem
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
                                onRemove={(id) => cartStore.removeItem(id)}
                                onQuantityChange={(id, quantity) =>
                                    cartStore.updateItemQuantity(id, quantity)}
                                class={{
                                    'border-b': i === cartStore.items.length - 1,
                                }}
                            />
                        </div>
                    {/each}
                </div>

                <div class="col-span-1 border border-stone-200 bg-white">
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

                    <form class="p-box border-t border-stone-200">
                        <Button class="w-full" variant="success-dark-base">
                            Checkout

                            {#snippet onHoverSnippet()}
                                <Icon icon="mdi:arrow-right" />
                            {/snippet}
                        </Button>
                    </form>

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
