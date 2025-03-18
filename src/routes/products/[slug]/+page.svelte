<script lang="ts">
    import type { PageProps } from './$types';
    import { enhance } from '$app/forms';
    import { fly } from 'svelte/transition';
    import { getEventStore } from '@store/eventStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { getCartStore } from '@store/cartStore.svelte';
    import { getNotificationStore } from '@store/notificationStore.svelte';
    import { setProductStore } from '@store/productStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import Button from '@atom/button/button.svelte';
    import Radio from '@atom/radio/radio.svelte';
    import Sale from '@atom/sale/sale.svelte';

    const { data }: PageProps = $props();
    const productStore = setProductStore();
    const notificationStore = getNotificationStore();
    const eventStore = getEventStore();
    const cartStore = getCartStore();

    productStore.product = data.product;

    const isAddingToCart = $derived(eventStore.hasAny(['add-to-cart']));

    let colorModel = $state(-1);
    let sizeModel = $state(-1);

    const selectedVariation = $derived.by(() => {
        if (!colorModel || !sizeModel) {
            return null;
        }

        return productStore.product.productVariation.find((variation) => {
            return (
                variation.colorId === colorModel &&
                variation.size_reference.id === sizeModel
            );
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
                result.add(variation.size_reference.id);
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
            if (
                variation.size_reference.id === sizeModel &&
                variation.stock === 0
            ) {
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

    async function submit({
        formElement,
        formData,
        action,
        cancel,
        submitter,
    }) {
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
            size: selectedVariation.size_reference.name,
            name: productStore.product.name,
        });

        if (success) {
            notificationStore.addNotification({
                title: success,
            });
        }

        if (error) {
            notificationStore.addNotification({
                title: error,
                type: 'warning',
            });

            cancel();
        }

        return async ({ result, update }) => {
            update();
        };
    }
</script>

<article
    in:fly={getFly()}
    class="mx-auto grid max-w-screen-2xl grid-cols-1 xl:grid-cols-6"
>
    <div class="col-span-3">
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

                {#if productStore.product.about}
                    <span class="mt-4 block font-bold italic">
                        {productStore.product.about}
                    </span>
                {/if}
            </p>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Features</h4>

                <ul class="mt-4 italic">
                    {#each productStore.product.fabricFeatures as feature (feature)}
                        <li>
                            {feature}
                        </li>
                    {/each}
                </ul>
            </div>

            <form method="POST" action="?/addItemToCart" use:enhance={submit}>
                {#if selectedVariation}
                    <input
                        type="hidden"
                        name="productVariationId"
                        value={selectedVariation.id}
                    />
                {/if}

                <div class="flex items-center border-t border-stone-200">
                    <fieldset class="flex gap-4 p-8">
                        {#each productStore.product.colors as color (color.id)}
                            <Radio
                                name="color"
                                value={color.id}
                                id={`${color.id}`}
                                required
                                bind:group={colorModel}
                                disabled={disabledColors.has(color.id)}
                                style={`background-color: #${color.hex};`}
                                title={color.name}
                            >
                                {#if color.salePrice}
                                    <Sale value={`€${color.salePrice}`}></Sale>
                                {/if}
                            </Radio>
                        {/each}
                    </fieldset>

                    <fieldset class="flex gap-4 border-l border-stone-200 p-8">
                        {#each productStore.product.sizes as size (size.id)}
                            <Radio
                                name="size"
                                value={size.id}
                                id={`${size.id}`}
                                required
                                bind:group={sizeModel}
                                disabled={disabledSizes.has(size.id)}
                            >
                                {size.name}
                            </Radio>
                        {/each}
                    </fieldset>

                    <!-- {#if availableStock !== null}
                        <div class="col-span-3 border-l border-stone-200 p-8">
                            {availableStock} In Stock
                        </div>
                    {/if} -->
                </div>

                <fieldset class="flex items-center border-t border-stone-200">
                    <div class="p-8 text-2xl font-bold">
                        {#if salePrice}
                            <money class="block text-red-500"
                                >€&nbsp;{salePrice}</money
                            >
                        {/if}

                        <money
                            class:line-through={salePrice}
                            class:text-stone-600={salePrice}
                            class:text-base={salePrice}
                        >
                            €&nbsp;{productStore.product.price}
                        </money>
                    </div>

                    <div class="flex-1 border-l border-stone-200 p-8">
                        <Button
                            modifier="w-full"
                            isLoading={isAddingToCart}
                            disabled={availableStock !== null &&
                                availableStock === 0}
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
                            <li>
                                {attribute.attribute}:
                                {attribute.value}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <div class="border-t border-stone-200 p-8">
                <h4 class="font-bold">Care instructions</h4>

                {#if productStore.product.fabricCareInstructions.length}
                    {#each productStore.product.fabricCareInstructions as careInstructions (careInstructions)}
                        <p class="mt-4">
                            {careInstructions}
                        </p>
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
                                {fabric.product_part_translation.at(0)?.name}
                                made from

                                {#if fabric.percentage !== 100}
                                    {fabric.percentage}%
                                {/if}

                                {variation.fabric_type?.name}
                                {variation.name}
                                {variation.weight}
                                gsm

                                {#each variation.fabric_type_composition as composition (composition.material_translation.at(0)?.name)}
                                    ({composition.percentage}%
                                    {composition.material_translation.at(0)
                                        ?.name})
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

<!-- <section class="bg-stone-900 p-8 text-stone-100">
    <article class="mx-auto max-w-screen-2xl">
        <h2 class="text-3xl">Similar styles</h2>
    </article>
</section> -->
