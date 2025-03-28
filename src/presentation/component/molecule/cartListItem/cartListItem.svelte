<script lang="ts">
    import type { ClassValue } from 'svelte/elements';
    import Icon from '@iconify/svelte';
    import { cn } from '@presentation/utils/style';
    import QuantityInput from '@molecule/quantityInput/quantityInput.svelte';
    import Button from '@atom/button/button.svelte';
    import Money from '@atom/money/money.svelte';

    interface Props {
        name: string;
        color: string;
        size: string;
        stock: number;
        quantity: number;
        isDeleteButtonLoading: (id: number) => boolean;
        salePrice: number;
        price: number;
        id: number;
        image: {
            src: string;
            alt: string;
        };
        slug: string;
        onRemove: (id: number) => void;
        onQuantityChange: (id: number, quantity: number) => void;
        class?: ClassValue;
    }

    let {
        onRemove,
        name,
        color,
        size,
        quantity,
        stock,
        salePrice,
        isDeleteButtonLoading,
        price,
        id,
        image,
        slug,
        onQuantityChange,
        ...props
    }: Props = $props();
</script>

<div
    {...props}
    class={cn(
        'p-box grid grid-cols-12 items-center justify-items-end gap-4 border-x border-t border-stone-200 bg-white',
        props.class,
    )}
>
    <a href={slug} class="col-span-10 flex items-center justify-self-start md:col-span-7">
        <img class="mr-4 max-w-16" src={image.src} alt={image.alt} />

        <div>
            <h4 class="text-h6 block">{name}</h4>

            <p class="text-stone-500">Color: {color} - Size: {size}</p>
        </div>

        <!-- {name} - {color} - {size} -->
    </a>

    <QuantityInput
        min={1}
        max={stock}
        name="quantity"
        bind:value={quantity}
        class="order-3 col-span-10 justify-self-start md:col-span-3 md:justify-self-end"
        onChange={(newQuantiy) => onQuantityChange(id, newQuantiy)}
    />

    <div class="item-end order-4 col-span-2 flex flex-col md:col-span-1">
        {#if salePrice}
            <Money value={salePrice} class="mb-2" />
        {/if}

        <Money
            value={price}
            class={{
                'line-through': salePrice,
            }}
        />
    </div>

    <Button
        size="square"
        variant="neutral-light-base"
        onclick={() => onRemove(id)}
        class="order-2 col-span-2 md:order-5 md:col-span-1"
        isLoading={isDeleteButtonLoading(id)}
    >
        <Icon icon="mdi:close" class="text-red-500" />
    </Button>
</div>
