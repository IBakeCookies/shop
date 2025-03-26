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
        salePrice: number;
        price: number;
        id: number;
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
        price,
        id,
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
        <!-- <img class="max-w-20 mr-4" src={`${slug}/index.webp`} alt="asd" /> -->

        {name} - {color} - {size}
    </a>

    <QuantityInput
        min={1}
        max={stock}
        name="quantity"
        bind:value={quantity}
        class="order-3 col-span-10 justify-self-start md:col-span-3 md:justify-self-end"
        onChange={(newQuantiy) => onQuantityChange(id, newQuantiy)}
    />

    <Money
        class="order-4 col-span-2 md:col-span-1"
        value={salePrice * quantity || price * quantity}
    />

    <Button
        size="square"
        variant="neutral-light-base"
        onclick={() => onRemove(id)}
        class="order-2 col-span-2 md:order-5 md:col-span-1"
    >
        <Icon icon="mdi:close" class="text-red-500" />
    </Button>
</div>
