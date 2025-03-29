<script lang="ts">
    import type { PageProps } from './$types';
    import type { SwiperContainer } from 'swiper/element/bundle';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { page } from '$app/state';
    import * as paraglide from '$lib/paraglide/messages.js';
    import { fly } from 'svelte/transition';
    import { getCartStore } from '@store/cartStore.svelte';
    import { getEventStore } from '@store/eventStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { setProductStore } from '@store/productStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import Button from '@atom/button/button.svelte';
    import Money from '@atom/money/money.svelte';
    import Radio from '@atom/radio/radio.svelte';
    import Sale from '@atom/sale/sale.svelte';
    import Swiper from '@atom/swiper/swiper.svelte';

    const { data }: PageProps = $props();
    const productStore = setProductStore();
    const eventStore = getEventStore();
    const cartStore = getCartStore();

    productStore.product = data.product;

    let colorModel = $state(-1);
    let sizeModel = $state(-1);
    let swiperContainer: SwiperContainer | undefined = $state();

    const isAddingToCart = $derived(eventStore.hasAny(['add-item-to-cart']));
    const slug = $derived(page.params.slug);

    const selectedVariation = $derived.by(() => {
        if (!colorModel || !sizeModel) {
            return null;
        }

        return productStore.product.variations.find((variation) => {
            return variation.colorId === colorModel && variation.size.id === sizeModel;
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

        productStore.product.variations.forEach((variation) => {
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

        productStore.product.variations.forEach((variation) => {
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
            productStore.product.variations.find((variation) => variation.colorId === colorModel)
                ?.salePrice || 0
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
            image: productStore.product.items.reduce(
                (result, acc) => {
                    for (const image of acc.images) {
                        if (acc.color.id === colorModel) {
                            result.src = image.src;
                            result.alt = image.alt;
                            break;
                        }
                    }

                    return result;
                },
                {
                    src: '',
                    alt: '',
                },
            ),
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

    $effect(() => {
        if (!swiperContainer || !swiperContainer.swiper) {
            return;
        }

        const indexOfSelectedColor = swiperContainer.swiper.slides.findIndex(
            (slide) => slide.id === `${colorModel}`,
        );

        if (indexOfSelectedColor === -1) {
            return;
        }

        swiperContainer.swiper.slideTo(indexOfSelectedColor);
    });

    productStore.getProduct(page.params.slug);
</script>

<article in:fly={getFly()} class="mx-auto grid max-w-screen-2xl grid-cols-1 xl:grid-cols-6">
    <Swiper
        bind:container={swiperContainer}
        class="sticky col-span-3 max-h-200"
        style="top: calc({pageStore.navHeight}px + {pageStore.alertHeight}px);"
        navigation={true}
    >
        {#each productStore.product.items as item}
            {#each item.images as image}
                <swiper-slide id={item.color.id} lazy="true">
                    <img src={image.src} alt={image.alt} class="mx-auto h-full" loading="lazy" />
                </swiper-slide>
            {/each}
        {/each}
    </Swiper>

    <div class="col-span-3 h-full border-r border-l border-stone-200 bg-white">
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
                {#each productStore.product.fabricFeatures as { name, icon }}
                    <li class="flex items-center">
                        <Icon {icon} class="mr-2 min-h-6 min-w-6" />
                        {name}
                    </li>
                {/each}
            </ul>
        </div>

        <form method="POST" action="?/addItemToCart" use:enhance={submit}>
            {#if selectedVariation}
                <input type="hidden" name="productVariationId" value={selectedVariation.id} />
            {/if}

            <div class="flex items-center border-t border-stone-200">
                <fieldset class="p-box flex flex-wrap gap-4">
                    {#each productStore.product.items as item}
                        <Radio
                            id={`${item.color.id}`}
                            name="color"
                            title={item.color.name}
                            value={item.color.id}
                            bind:group={colorModel}
                            size="square"
                            backgroundColor={`#${item.color.hex};`}
                            disabled={disabledColors.has(item.color.id)}
                            required
                        >
                            {#if item.salePrice}
                                <Sale value={`€${item.salePrice}`} />
                            {/if}
                        </Radio>
                    {/each}
                </fieldset>

                <fieldset class="p-box flex flex-wrap gap-4 border-l border-stone-200">
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
                    />
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
                <h4 class="font-bold text-emerald-600">{paraglide.product_size_info()}</h4>

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

        <div class="p-box border-t border-stone-200">
            <h4 class="font-bold text-emerald-600">{paraglide.product_materials_info()}</h4>

            <ul class="mt-4">
                {#each productStore.product.productComposition as fabric}
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
                            {variation.weight_unit_code}

                            {#each variation.fabric_type_composition as composition}
                                ({composition.percentage}%
                                {composition.material_translation.at(0)?.name})
                            {/each}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>

        {#if productStore.product.careInstructions.length}
            <div class="p-box border-t border-stone-200">
                <h4 class="font-bold text-emerald-600">Care instructions</h4>

                <ul class="mt-4 space-y-2">
                    {#each productStore.product.careInstructions as item}
                        <li class=" flex items-center">
                            {#if item.icon}
                                <Icon icon={item.icon} class="mr-2 min-h-6 min-w-6" />
                            {/if}

                            {item.instruction}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}

        <div class="p-box border-t border-stone-200">
            <h4 class="font-bold text-emerald-600">Additional information</h4>

            {#if productStore.product.about}
                <p class="mt-4">
                    {productStore.product.about}
                </p>
            {/if}

            <table class="mt-4 w-full border-collapse">
                <thead>
                    <tr>
                        <th class="border border-stone-200 bg-stone-50 p-2 text-left"> Size </th>

                        <th class="border border-stone-200 bg-stone-50 p-2 text-left"> Weight </th>
                    </tr>
                </thead>

                <tbody>
                    {#each productStore.product.sizes as size}
                        <tr>
                            <td class="border border-stone-200 p-2">{size.name}</td>
                            <td class="border border-stone-200 p-2">{size.weight}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</article>

<!-- {#if availableStock !== null}
                        <div class="col-span-3 border-l border-stone-200 p-box">
                            {availableStock} In Stock
                        </div>
                    {/if} -->

<!-- <section class="bg-stone-900 p-box text-stone-100">
    <article class="mx-auto max-w-screen-2xl">
        <h2 class="text-3xl">Similar styles</h2>
    </article>
</section> -->
