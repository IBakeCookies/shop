<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import Icon from '@iconify/svelte';
    import { cn } from '@presentation/utils/style';
    import Money from '@atom/money/money.svelte';

    // import Button from '@atom/button/button.svelte';
    // import Input from '@atom/input/input.svelte';
    // import { useAccordion } from '@atom/accordion/accordion.svelte';
    // import AccordionItems from '@atom/accordion/accordionItems.svelte';
    // import AccordionLabel from '@atom/accordion/accordionLabel.svelte';

    interface Item {
        title: string;
        href: string;
    }

    interface Props {
        ref?: null | HTMLElement;
        items: Item[];
        cartItemsCount: number;
        totalPrice: number;
        class?: ClassValue;
        children?: Snippet;
    }

    let { totalPrice, cartItemsCount, items, children, ...props }: Props = $props();

    // const productAccordion = useAccordion();
</script>

<nav {...props} class={cn('grid grid-cols-3 items-center', props.class)}>
    <div class="flex space-x-8">
        {#each items as item}
            <a href={item.href}>
                {item.title}
            </a>
        {/each}

        <!-- <div>
            <AccordionLabel onclick={productAccordion.toggleAccordion}>
                Products
            </AccordionLabel>
    
            <AccordionItems 
                variant="bordered" 
                isOpen={productAccordion.isOpen} 
                class="absolute z-10 w-64 bg-white">
                {#each items as item}
                    <a onclick={productAccordion.toggleAccordion}  class="block p-4" href={item.href}>
                        {item.title}
                    </a>
                {/each}
            </AccordionItems>
        </div> -->
    </div>

    <h2 class="text-center text-4xl">
        <a href="/">
            {@render children?.()}
        </a>
    </h2>

    <div class="flex items-center justify-end space-x-4">
        <!-- {#each userItems as userItem, i}
            <li>
                <a class="block" class:mr-4={i > 0} href={userItem.href}>
                    {userItem.name}
                </a>
            </li>
        {/each} -->

        <!-- <Button class="ml-4 flex cursor-pointer" href="/login" variant="anchor">
            <Icon icon="mdi:account" class="h-6 w-6" />
        </Button> -->

        <!-- <Input name="search" type="text" placeholder="Search products" /> -->

        <a class="flex cursor-pointer items-center" href="/cart" title="cart">
            <div class="relative flex items-center">
                {#if cartItemsCount}
                    <span
                        class="absolute top-0 left-full flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white"
                    >
                        {cartItemsCount}
                    </span>
                {/if}

                <Icon icon="mdi:cart" class="h-6 w-6" />
            </div>

            {#if totalPrice}
                <Money value={totalPrice} class="ml-4" />
            {/if}
        </a>
    </div>
</nav>
