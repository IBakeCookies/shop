<script lang="ts">
    import Icon from '@iconify/svelte';
    // import Button from '@atom/button/button.svelte';
    import { cartStore } from '@store/cartStore.svelte';

    interface Props {
        ref?: null | HTMLDivElement;
    }

    let { ref = $bindable(null), ...props }: Props = $props();

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
</script>

<nav
    {...props}
    bind:this={ref}
    class="sticky top-0 z-100 border-b border-stone-200 bg-white/50 backdrop-blur-sm"
>
    <div class="mx-auto max-w-screen-2xl p-8">
        <ul class="mx-auto grid grid-cols-3 items-center">
            <div class="flex space-x-4">
                {#each menuItems as menuItem (menuItem.name)}
                    <li>
                        <a class="block" href={menuItem.href}>
                            {menuItem.name}
                        </a>
                    </li>
                {/each}
            </div>

            <div class="text-center">
                <h1 class="text-4xl font-bold">REVAR</h1>
            </div>

            <div class="flex items-center justify-end space-x-4">
                <!-- {#each userItems as userItem, i}
                    <li>
                        <a class="block" class:mr-4={i > 0} href={userItem.href}>
                            {userItem.name}
                        </a>
                    </li>
                {/each} -->

                <button class="ml-4 flex cursor-pointer">
                    <Icon icon="mdi:account" class="h-6 w-6" />
                </button>

                <button class="flex cursor-pointer items-center">
                    {cartStore.getItems().length ? cartStore.getItems().length : ''}

                    <Icon
                        icon="mdi:cart"
                        class="h-6 w-6 {cartStore.getItems().length ? 'ml-2' : ''}"
                    />
                </button>
            </div>
        </ul>
    </div>
</nav>
