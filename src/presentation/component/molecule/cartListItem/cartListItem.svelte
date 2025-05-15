<script lang="ts">
    import type { SubmitFunction } from './$types';
    import type { ClassValue } from 'svelte/elements';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
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
        image: {
            src: string;
            alt: string;
        };
        slug: string;
        formActionRemoveItem: string;
        formActionQuantityChange: string;
        onRemoveItem: SubmitFunction;
        onQuantityChange: SubmitFunction;
        class?: ClassValue;
        isDeleteButtonLoading: (id: number) => boolean;
        isQuantityButtonLoading: (id: number) => boolean;
    }

    let {
        name,
        color,
        size,
        quantity,
        stock,
        salePrice,
        isDeleteButtonLoading,
        isQuantityButtonLoading,
        price,
        id,
        image,
        slug,
        formActionQuantityChange,
        formActionRemoveItem,
        onQuantityChange,
        onRemoveItem,
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
        <img class="max-h-20" src={image.src} alt={image.alt} />

        <div class="ml-4">
            <h4 class="text-h6 block">{name}</h4>

            <p class="text-stone-500">Color: {color} - Size: {size}</p>
        </div>

        <!-- {name} - {color} - {size} -->
    </a>

    <form 
        class="flex order-3 col-span-10 justify-self-start md:col-span-3 md:justify-self-end" 
        method="POST" action={formActionQuantityChange} 
        use:enhance={onQuantityChange}>

        <input type="hidden" name="id" value={id} />

        <QuantityInput
            min={1}
            max={stock}
            name="quantity"
            bind:value={quantity}
        />

        <Button 
            isLoading={isQuantityButtonLoading(id)} 
            class="ml-4" 
            type="submit"
            variant="neutral-light-base" 
            size="small">
            Update
        </Button>
    </form>

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

    <form method="POST" action={formActionRemoveItem} use:enhance={onRemoveItem}
        class="order-2 col-span-2 md:order-5 md:col-span-1">
        <input type="hidden" name="id" value={id} />

        <Button
            type="submit"
            size="square"
            variant="neutral-light-base"
            isLoading={isDeleteButtonLoading(id)}
        >
            <Icon icon="mdi:close" class="text-red-500" />
        </Button>
    </form>
</div>
