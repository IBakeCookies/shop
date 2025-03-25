<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import Icon from '@iconify/svelte';
    import { cn } from '@presentation/utils/style';
    import Button from '@atom/button/button.svelte';

    interface Item {
        title: string;
        href: string;
    }

    interface Props {
        ref?: null | HTMLElement;
        items: Item[];
        cartItemsCount: number;
        class?: ClassValue;
        children?: Snippet;
    }

    let { cartItemsCount, items, children, ...props }: Props = $props();

    let isScrolled = $state(false);

    $effect(() => {
        window.addEventListener('scroll', () => {
            isScrolled = window.scrollY > 100;
            // @todo remove event listener
        });
    });
</script>

<nav {...props} class={cn('grid grid-cols-3 items-center', props.class)}>
    <div class="flex space-x-8">
        {#each items as item}
            <a href={item.href}>
                {item.title}
            </a>
        {/each}
    </div>

    <div class="text-center">
        <h1 class="text-4xl">
            {@render children?.()}
        </h1>
    </div>

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

        <a class="flex cursor-pointer items-center" href="/cart">
            {cartItemsCount ? cartItemsCount : ''}

            <Icon icon="mdi:cart" class="h-6 w-6 {cartItemsCount ? 'ml-2' : ''}" />
        </a>
    </div>
</nav>
