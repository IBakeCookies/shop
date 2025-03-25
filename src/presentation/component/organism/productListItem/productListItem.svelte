<script lang="ts">
    // import type { ClassValue } from 'clsx';
    import type { ClassValue } from 'svelte/elements';

    import { cn } from '@presentation/utils/style';
    import Money from '@atom/money/money.svelte';
    import Sale from '@atom/sale/sale.svelte';

    interface Props {
        name: string;
        price: number;
        image: {
            src: string;
            alt: string;
        };
        variants: {
            salePrice: number;
            colorName: string;
        }[],
        class?: ClassValue;
    }

    const { image, variants, name, price, ...props }: Props = $props();

    const hasSale = $derived.by(() => variants.some((variant) => variant.salePrice));
</script>

<div
    {...props}
    class={cn(
        'flex min-h-130 max-h-130 h-full flex-col border border-stone-200 bg-white transition-all hover:-translate-y-1 ',
        props.class,
    )}
    title={name}
>
    <div class="p-box relative h-full">
        <img src={image.src} alt={image.alt} class="h-full w-full max-w-full object-contain" />

        <ul class="absolute bottom-2 left-4 flex w-full items-center">
            {#each variants as variant}
                <li
                    title={variant.colorName}
                    aria-label={variant.colorName}
                    class="relative mr-3 flex h-5 w-5 items-center justify-center border-2 border-stone-200"
                    style="background-color: {variant.colorName};"
                >
                    {#if variant.salePrice}
                        <Sale value={`€${variant.salePrice}`} size="small" /> 
                    {/if}
                </li>
            {/each}
        </ul>     

        {#if hasSale}
            <div class="absolute top-2 right-4 text-red-600">
                Sale % 
            </div>
        {/if}
    </div>

    <div class="mt-auto border-t border-stone-200">
        <div class="text-md grid grid-cols-12">
            <h2 class="col-span-9 p-4">
                {name}
            </h2>

            <Money 
                value={price} 
                class="col-span-3 flex items-center justify-center self-stretch border-l border-stone-200 p-4"/>
        </div>
    </div>
</div>
