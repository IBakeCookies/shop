<script lang="ts">
    import { cn } from '@presentation/utils/style';

    interface Props {
        image: {
            src: string;
            alt: string;
        };
        colors: string[];
        name: string;
        price: number;
        salePrice?: number;
    }

    const { salePrice, image, colors, name, price, ...restProps }: Props = $props();
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
        <ul class="flex px-8 py-4">
            {#each colors as color}
                <li
                    title={color}
                    aria-label={color}
                    class="mr-3 rounded-xl border-2 border-stone-300 p-2"
                    style="background-color:{color}"
                ></li>
            {/each}
        </ul>

        <div class="text-md flex items-center justify-between border-t border-stone-200">
            <h2 class="flex items-center px-8 py-4">
                {name}
            </h2>

            <div class="ml-4 border-l border-stone-200 px-8 py-4">
                {#if salePrice}
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
                </money>
            </div>
        </div>
    </div>
</div>
