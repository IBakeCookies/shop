<script lang="ts">
    import Icon from '@iconify/svelte';
    import { getCartStore } from '@store/cartStore.svelte';
    import { cn } from '@presentation/utils/style';
    import Button from '@atom/button/button.svelte';

    interface Props {
        ref?: null | HTMLElement;
    }

    let { ref = $bindable(null), ...props }: Props = $props();

    const cartStore = getCartStore();

    const menuItems = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Products',
            href: '/products',
        },
    ];

    let isScrolled = $state(false);

    $effect(() => {
        window.addEventListener('scroll', () => {
            if (!ref) {
                return;
            }

            isScrolled = window.scrollY > ref.scrollHeight;
        });
    });
</script>

<nav
    {...props}
    bind:this={ref}
    class="sticky top-0 z-100 border-b border-stone-200 bg-stone-50/50 backdrop-blur-sm"
>
    <div
        class={cn('mx-auto max-w-screen-2xl p-8 transition-all', {
            'py-6': isScrolled,
        })}
    >
        <ul class="mx-auto grid grid-cols-3 items-center">
            <li class="flex space-x-8">
                {#each menuItems as menuItem (menuItem.name)}
                    <Button variant="anchor" class="block" href={menuItem.href}>
                        {menuItem.name}
                    </Button>
                {/each}
            </li>

            <li class="text-center">
                <h1 class="text-4xl font-bold">REVAR</h1>
            </li>

            <li class="flex items-center justify-end space-x-4">
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

                <Button
                    class="flex cursor-pointer items-center"
                    href="/cart"
                    variant="anchor"
                >
                    {cartStore.totalItemsCount ? cartStore.totalItemsCount : ''}

                    <Icon
                        icon="mdi:cart"
                        class="h-6 w-6 {cartStore.totalItemsCount
                            ? 'ml-2'
                            : ''}"
                    />
                </Button>
            </li>
        </ul>
    </div>
</nav>
