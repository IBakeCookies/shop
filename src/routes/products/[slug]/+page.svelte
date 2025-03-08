<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity';
    import { enhance } from '$app/forms';
    import { productStore } from '@store/productStore.svelte';
    import { eventStore } from '@store/evenStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import Button from '@atom/button/button.svelte';
    import Radio from '@atom/radio/radio.svelte';
    // import { cartStore } from '@store/cartStore.svelte';

    const isAddingToCart = $derived(eventStore.hasAny(['add-to-cart']));
    let colorModel = $state('');
    let sizeModel = $state('');
    let disabledColors = new SvelteSet<string>();

    const stockForSelectedVariation: number | null = $derived.by(() => {
        if (!colorModel || !sizeModel || !productStore.product.variations[colorModel]) {
            return null;
        }

        return productStore.product.variations[colorModel][sizeModel];
    });

    function isSizeDisabled(id: number): boolean | null {
        if (!colorModel || !productStore.product.variations[colorModel]) {
            return null;
        }

        return Boolean(!productStore.product.variations[colorModel][id]);
    }

    $effect(() => {
        if (!sizeModel) {
            return;
        }

        for (const color in productStore.product.variations) {
            if (!productStore.product.variations[color][sizeModel]) {
                disabledColors.add(color);
            } else {
                disabledColors.delete(color);
            }
        }
    });

    const salePrice = $derived.by(() => {
        return productStore.product.colors.find((color) => color.id === colorModel)?.salePrice;
    });
</script>

<article class="mx-auto grid max-w-screen-2xl grid-cols-6">
    <div class="col-span-3">
        <img
            src={productStore.product.image.src}
            alt={productStore.product.image.alt}
            class="max-w-full"
        />
        <img
            src={productStore.product.image.src}
            alt={productStore.product.image.alt}
            class="max-w-full"
        />
    </div>

    <div class="col-span-3 h-full border-r border-l border-stone-200">
        <div class="sticky" style="top: {pageStore.navHeight}px">
            <h2 class="p-8 text-4xl font-bold">
                {productStore.product.name}
            </h2>

            <p class="border-t border-stone-200 p-8">
                {productStore.product.description}
            </p>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Features</h4>

                <ul class="mt-4 italic">
                    {#each productStore.product.fabricFeatures as feature (feature)}
                        <li>{feature}</li>
                    {/each}
                </ul>
            </div>

            <form method="POST" action="?/addItemToCart" use:enhance>
                <div class="grid grid-cols-10 items-center border-t border-stone-200">
                    <fieldset class="col-span-4 flex gap-6 p-8">
                        {#each productStore.product.colors as color (color.id)}
                            <Radio
                                name="color"
                                value={color.id}
                                id={`${color.id}`}
                                required
                                bind:group={colorModel}
                                disabled={disabledColors.has(`${color.id}`)}
                            >
                                {color.name}
                            </Radio>
                        {/each}
                    </fieldset>

                    <fieldset class="col-span-6 flex gap-8 border-l border-stone-200 p-8">
                        {#each productStore.product.sizes as size (size.id)}
                            {@const isDisabled = isSizeDisabled(size.id)}

                            <Radio
                                name="size"
                                value={size.id}
                                id={`${size.id}`}
                                required
                                bind:group={sizeModel}
                                disabled={isDisabled}
                            >
                                {size.name}
                            </Radio>
                        {/each}
                    </fieldset>

                    <!-- {#if stockForSelectedVariation !== null}
                        <div class="col-span-3 border-l border-stone-200 p-8">
                            {stockForSelectedVariation} In Stock
                        </div>
                    {/if} -->
                </div>

                <fieldset class="flex items-center border-t border-stone-200">
                    <div class="p-8 text-2xl font-bold">
                        {#if salePrice}
                            <money class="block text-red-500">€ {salePrice}</money>
                        {/if}

                        <money
                            class:line-through={salePrice}
                            class:text-stone-600={salePrice}
                            class:text-base={salePrice}
                        >
                            € {productStore.product.price}
                        </money>
                    </div>

                    <div class="flex-1 border-l border-stone-200 p-8">
                        <Button
                            modifier="w-full"
                            isLoading={isAddingToCart}
                            disabled={stockForSelectedVariation !== null &&
                                stockForSelectedVariation === 0}
                        >
                            Add to cart
                        </Button>
                    </div>
                </fieldset>
            </form>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Size & fit</h4>

                {#if productStore.product.attributes.length}
                    <ul class="mt-4">
                        {#each productStore.product.attributes as attribute (attribute.attribute)}
                            <li>{attribute.attribute}: {attribute.value}</li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Care instructions</h4>

                {#if productStore.product.fabricCareInstructions.length}
                    {#each productStore.product.fabricCareInstructions as careInstructions (careInstructions)}
                        <p class="mt-4">{careInstructions}</p>
                    {/each}
                {/if}
            </div>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Materials & Fabrics</h4>

                <ul class="mt-4">
                    {#each productStore.product.productComposition as fabric (fabric.id)}
                        {@const variation = fabric.fabric_type_variation}
                        {#if variation}
                            <li>
                                {fabric.product_part_translation.at(0)?.name} made from

                                {#if fabric.percentage !== 100}
                                    {fabric.percentage}%
                                {/if}

                                {variation.fabric_type?.name}
                                {variation.name}
                                {variation.weight} gsm

                                {#each variation.fabric_type_composition as composition (composition.material_translation.at(0)?.name)}
                                    ({composition.percentage}%
                                    {composition.material_translation.at(0)?.name})
                                {/each}
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>

            {#if productStore.product.about}
                <div class="border-t border-stone-200 p-8">
                    <h4 class="font-bold">About</h4>

                    <p class="mt-4">
                        {productStore.product.about}
                    </p>
                </div>
            {/if}
        </div>
    </div>
</article>

<section class="bg-stone-900 p-8 text-stone-50">
    <article class="mx-auto max-w-screen-2xl">
        <h2 class="text-3xl">Similar styles</h2>
    </article>
</section>
