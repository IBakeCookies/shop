<script lang="ts">
    import type { PageProps } from './$types';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { fly } from 'svelte/transition';
    import { getCartStore } from '@store/cartStore.svelte';
    import { getEventStore } from '@store/eventStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { setProductStore } from '@store/productStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import Button from '@atom/button/button.svelte';
    import Money from '@atom/money/money.svelte';
    import Radio from '@src/presentation/component/atom/radio/radio.svelte';
    import Sale from '@atom/sale/sale.svelte';
	import { page } from '$app/state';

    const { data }: PageProps = $props();
    const productStore = setProductStore();
    const eventStore = getEventStore();
    const cartStore = getCartStore();

    productStore.product = data.product;

    const isAddingToCart = $derived(eventStore.hasAny(['add-item-to-cart']));
	const slug = $derived(page.params.slug); 

    let colorModel = $state(-1);
    let sizeModel = $state(-1);

    const selectedVariation = $derived.by(() => {
        if (!colorModel || !sizeModel) {
            return null;
        }

        return productStore.product.productVariation.find((variation) => {
            return variation.colorId === colorModel 
                && variation.size.id === sizeModel;
        });
    });

    const availableStock: number | null = $derived.by(() => {
        if (!selectedVariation) {
            return null;
        }

        return selectedVariation.stock;
    });

    const disabledSizes = $derived.by(() => {
        const result = new Set();

        if (!colorModel) {
            return result;
        }

        productStore.product.productVariation.forEach((variation) => {
            if (variation.colorId === colorModel && variation.stock === 0) {
                result.add(variation.size.id);
            }
        });

        return result;
    });

    const disabledColors = $derived.by(() => {
        const result = new Set();

        if (!sizeModel) {
            return result;
        }

        productStore.product.productVariation.forEach((variation) => {
            if (variation.size.id === sizeModel && variation.stock === 0) {
                result.add(variation.colorId);
            }
        });

        return result;
    });

    const salePrice: number = $derived.by(() => {
        if (!colorModel) {
            return 0;
        }

        return (
            productStore.product.productVariation.find(
                (variation) => variation.colorId === colorModel,
            )?.salePrice || 0
        );
    });

    async function submit({ formElement, formData, action, cancel, submitter }) {
        if (!selectedVariation) {
            return cancel();
        }

        const { success, error } = await cartStore.addItem({
            id: selectedVariation.id,
            stock: selectedVariation.stock,
            quantity: 1,
            price: productStore.product.price,
            salePrice: selectedVariation.salePrice,
            color: selectedVariation.colorName,
            size: selectedVariation.size.size_translation.at(0)?.name || '',
            name: productStore.product.name,
            slug,
        });

        if (success) {
            // do something?
        }

        if (error) {
            cancel();
        }

        return async ({ result, update }) => {
            update();
        };
    }

    const icons = {
        'Regulates warmth': 'mdi:sun-snowflake-variant',
        Lightweight: 'mdi:feather',
        'Highly breathable': 'mdi:air-filter',
        'Fast drying': 'mdi:water-evaporation',
        Compressible: 'mdi:compress',
        'Dual surface': 'mdi:layers',
        'Resists abrasion': 'mdi:shield',
        'Four-way stretch': 'mdi:arrow-expand-all',
        'Shape retention': 'mdi:shape-outline',
        'Superior wicking': 'mdi:water-percent',
    };
</script>

<article in:fly={getFly()} class="mx-auto grid max-w-screen-2xl grid-cols-1 xl:grid-cols-6">
    <div class="col-span-3">
        <img
            src={productStore.product.image.src}
            alt={productStore.product.image.alt}
            class="max-w-full"
        />
    </div>

    <div class="col-span-3 h-full border-r border-l border-stone-200 bg-white">
        <div class="sticky" style="top: {pageStore.navHeight}px">
            <h2 class="p-8 text-4xl">
                {productStore.product.name}
            </h2>

            <p class="p-box border-t border-stone-200">
                {productStore.product.description}

                {#if productStore.product.about}
                    <span class="mt-4 block italic">
                        {productStore.product.about}
                    </span>
                {/if}
            </p>

            <div class="p-box border-t border-stone-200">
                <h4 class="font-bold text-emerald-600">Features</h4>

                <ul class="mt-4 space-y-2 italic">
                    {#each productStore.product.fabricFeatures as feature (feature)}
                        <li class="flex items-center">
                            <Icon icon={icons[feature]} class="mr-2 min-h-6 min-w-6" />
                            {feature}
                        </li>
                    {/each}
                </ul>
            </div>

            <form method="POST" action="?/addItemToCart" use:enhance={submit}>
                {#if selectedVariation}
                    <input type="hidden" name="productVariationId" value={selectedVariation.id} />
                {/if}

                <div class="flex items-center border-t border-stone-200">
                    <fieldset class="p-box flex gap-4 flex-wrap">
                        {#each productStore.product.colors as color (color.id)}
                            <Radio
                                id={`${color.id}`}
                                name="color"
                                title={color.name}
                                value={color.id}
                                bind:group={colorModel}
                                size="square"
                                backgroundColor={`#${color.hex};`}
                                disabled={disabledColors.has(color.id)}
                                required
                            >
                                {#if color.salePrice}
                                    <Sale value={`€${color.salePrice}`} />
                                {/if}
                            </Radio>
                        {/each}
                    </fieldset>

                    <fieldset class="p-box flex gap-4 border-l border-stone-200 flex-wrap">
                        {#each productStore.product.sizes as size (size.id)}
                            <Radio
                                id={`${size.id}`}
                                name="size"
                                title={size.name}
                                value={size.id}
                                bind:group={sizeModel}
                                disabled={disabledSizes.has(size.id)}
                                required
                            >
                                {size.name}
                            </Radio>
                        {/each}
                    </fieldset>

                    <!-- {#if availableStock !== null}
                        <div class="col-span-3 border-l border-stone-200 p-box">
                            {availableStock} In Stock
                        </div>
                    {/if} -->
                </div>

                <fieldset class="flex items-center border-t border-stone-200">
                    <div class="p-8 text-2xl">
                        {#if salePrice}
                            <Money class="block" value={salePrice} />
                        {/if}

                        <Money
                            value={productStore.product.price}
                            class={{
                                'text-base text-stone-600 line-through': salePrice,
                            }}
                        ></Money>
                    </div>

                    <div class="p-box flex-1 border-l border-stone-200">
                        <Button
                            class="w-full"
                            isLoading={isAddingToCart}
                            disabled={availableStock !== null && availableStock === 0}
                        >
                            Add to cart
                        </Button>
                    </div>
                </fieldset>
            </form>

            {#if productStore.product.attributes.length}
                <div class="p-box border-t border-stone-200">
                    <h4 class="font-bold text-emerald-600">Size & fit</h4>

                    <ul class="mt-4">
                        {#each productStore.product.attributes as attribute}
                            <li>
                                {attribute.attribute}:
                                {attribute.value}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}

            {#if productStore.product.fabricCareInstructions.length}
                <div class="p-box border-t border-stone-200">
                    <h4 class="font-bold text-emerald-600">Care instructions</h4>

                    {#each productStore.product.fabricCareInstructions as careInstructions}
                        <p class="mt-4">
                            {careInstructions}
                        </p>
                    {/each}
                </div>
            {/if}

            <div class="p-box border-t border-stone-200">
                <h4 class="font-bold text-emerald-600">Materials & Fabrics</h4>

                <ul class="mt-4">
                    {#each productStore.product.productComposition as fabric (fabric.id)}
                        {@const variation = fabric.fabric_type_variation}
                        {#if variation}
                            <li>
                                {fabric.product_part_translation.at(0)?.name}
                                made from

                                {#if fabric.percentage !== 100}
                                    {fabric.percentage}%
                                {/if}

                                {variation.fabric_type?.name}
                                {variation.name}
                                {variation.weight}
                                gsm

                                {#each variation.fabric_type_composition as composition}
                                    ({composition.percentage}%
                                    {composition.material_translation.at(0)?.name})
                                {/each}
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>

            {#if productStore.product.about}
                <div class="p-box border-t border-stone-200">
                    <h4 class="">About</h4>

                    <p class="mt-4">
                        {productStore.product.about}
                    </p>
                </div>
            {/if}
        </div>
    </div>
</article>

<div class="bg-white border-t border-stone-200">
    <div class="grid grid-cols-3 mx-auto max-w-screen-2xl">
        {#if productStore.product.attributes.length}
            <div class="p-box border-x border-stone-200">
                <h4 class="font-bold text-emerald-600">Size & fit</h4>

                <ul class="mt-4">
                    {#each productStore.product.attributes as attribute}
                        <li>
                            {attribute.attribute}:
                            {attribute.value}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}

        {#if productStore.product.fabricCareInstructions.length}
            <div class="p-box border-r border-stone-200">
                <h4 class="font-bold text-emerald-600">Care instructions</h4>

                {#each productStore.product.fabricCareInstructions as careInstructions}
                    <p class="mt-4">
                        {careInstructions}
                    </p>
                {/each}
            </div>
        {/if}

        <div class="p-box border-r border-stone-200">
            <h4 class="font-bold text-emerald-600">Materials & Fabrics</h4>

            <ul class="mt-4">
                {#each productStore.product.productComposition as fabric (fabric.id)}
                    {@const variation = fabric.fabric_type_variation}
                    {#if variation}
                        <li>
                            {fabric.product_part_translation.at(0)?.name}
                            made from

                            {#if fabric.percentage !== 100}
                                {fabric.percentage}%
                            {/if}

                            {variation.fabric_type?.name}
                            {variation.name}
                            {variation.weight}
                            gsm

                            {#each variation.fabric_type_composition as composition}
                                ({composition.percentage}%
                                {composition.material_translation.at(0)?.name})
                            {/each}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>

        {#if productStore.product.about}
            <div class="p-box border-t border-stone-200">
                <h4 class="">About</h4>

                <p class="mt-4">
                    {productStore.product.about}
                </p>
            </div>
        {/if}    
    </div>    
</div>

<!-- <section class="bg-stone-900 p-box text-stone-100">
    <article class="mx-auto max-w-screen-2xl">
        <h2 class="text-3xl">Similar styles</h2>
    </article>
</section> -->
