<script lang="ts">
    import type { ClassValue } from 'clsx';
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
        }[];
        modifier?: ClassValue;
    }

    const { image, variants, name, price, modifier, ...props }: Props =
        $props();
</script>

<div
    {...props}
    class={cn(
        'flex h-full flex-col border border-stone-200 transition-all hover:-translate-y-1 hover:bg-stone-50',
        modifier,
    )}
    title={name}
>
    <div class="relative h-full p-8">
        <img
            src={image.src}
            alt={image.alt}
            class="h-full w-full max-w-full object-contain"
        />

        <ul class="absolute bottom-2 left-4 flex w-full items-center">
            {#each variants as variant (variant.colorName)}
                <li
                    title={variant.colorName}
                    aria-label={variant.colorName}
                    class="relative mr-3 flex h-5 w-5 items-center justify-center border-2 border-stone-200"
                    style="background-color: {variant.colorName};"
                >
                    {#if variant.salePrice}
                        <Sale value={`€${variant.salePrice}`} variant="small" />
                    {/if}
                </li>
            {/each}
        </ul>
    </div>

    <div class="mt-auto border-t border-stone-200 font-bold">
        <div class="text-md grid grid-cols-12">
            <h2 class="col-span-9 p-4">
                {name}
            </h2>

            <div
                class="col-span-3 flex items-center justify-center self-stretch border-l border-stone-200 p-4"
            >
                <Money value={price} />
            </div>
        </div>
    </div>
</div>
