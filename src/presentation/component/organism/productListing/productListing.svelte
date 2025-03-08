<script lang="ts">
    import { cn } from '@presentation/utils/style';
    import Money from '@atom/money/money.svelte';
    interface Props {
        image: {
            src: string;
            alt: string;
        };
        variants: {
            salePrice: number;
            colorName: string;
        }[];
        name: string;
        price: number;
    }

    const { image, variants, name, price, ...restProps }: Props = $props();
</script>

<div
    {...restProps}
    class={cn('flex h-full flex-col border border-stone-200 transition-colors hover:bg-stone-50')}
    title={name}
>
    <div class="h-full p-8">
        <div class="relative h-full max-h-[22rem]">
            <img src={image.src} alt={image.alt} class="h-full w-full max-w-full object-contain" />
        </div>
    </div>

    <div class="mt-auto border-t border-stone-200 font-bold">
        <div class="text-md grid grid-cols-12">
            <h2 class="col-span-9 p-4">
                {name}
            </h2>

            <div
                class="col-span-3 flex items-center justify-center self-stretch border-l border-stone-200 p-4"
            >
                <!-- {#if salePrice}
                    <money class="block text-red-600">
                        €&nbsp;{salePrice}
                    </money>
                {/if}

                <money
                    class:line-through={salePrice}
                    class:text-sm={salePrice}
                    class:text-stone-600={salePrice}
                >
                    €&nbsp;{price}
                </money> -->

                <Money value={price}></Money>
            </div>
        </div>

        <ul class="flex border-t border-stone-200 p-4">
            {#each variants as variant (variant.colorName)}
                <li
                    title={variant.colorName}
                    aria-label={variant.colorName}
                    class="relative mr-3 rounded-xl border-2 border-stone-300 p-2"
                    style="background-color:{variant.colorName}"
                >
                    {#if variant.salePrice}
                        <!-- <money class="block text-red-600">
                        €&nbsp;{variant.salePrice}
                    </money> -->

                        <span class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                            %
                        </span>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
</div>
