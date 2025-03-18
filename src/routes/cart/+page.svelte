<script lang="ts">
    import { getCartStore } from '@store/cartStore.svelte';
    import { fly } from 'svelte/transition';
    import { getFly } from '@presentation/utils/fly';
    import Icon from '@iconify/svelte';
    import Button from '@atom/button/button.svelte';
    import Money from '@atom/money/money.svelte';

    const cartStore = getCartStore();
</script>

<section in:fly={getFly()} class="mx-auto w-full max-w-screen-2xl px-8 py-24">
    <h1 class="text-3xl font-bold mb-6">Cart</h1>

    <div class="grid grid-cols-12 gap-8 items-start">
        <div class="col-span-9">
            {#each cartStore.items as item, i}
                <div 
                    class="p-8 border-t border-x border-stone-200 flex items-center justify-between" 
                    class:border-b={i === cartStore.items.length - 1}
                > 
                    <p>
                        {item.name} - {item.color} - {item.size} <b>x {item.quantity}</b>
                    </p>

                    <div class="ml-8 flex items-center font-bold">
                        <Money 
                            value={item.salePrice * item.quantity || item.price * item.quantity}
                        />
                                        
                        <Button variant="icon" modifier="ml-4">
                            <Icon icon="mdi:close" />
                        </Button>
                    </div>
                </div>
            {/each}
        </div>

        <div class="col-span-3 border border-stone-200 font-bold">
            <h2 class="text-xl p-8 border-b border-stone-200">
                Summary
            </h2>

            <div class="p-8">
                <p>Subtotal: <Money value={500} /></p>
                <p>Shipping: <Money value={5} /></p>
            </div>
            
            <p class="p-8 border-t border-b border-stone-200">
                Total: <Money value={505} />
            </p>

            <div class="p-8">
                <Button modifier="w-full" variant="primary">Checkout</Button>
            </div>
        </div>
    </div>
</section>

