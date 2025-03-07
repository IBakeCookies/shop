<script lang="ts">
    import Icon from '@iconify/svelte';
    // import Button from '@atom/button/button.svelte';
    import { cartStore } from '@store/cartStore.svelte';

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

    // const userItems = [
    //     {
    //         name: 'Login',
    //         href: '/login',
    //     },
    // ];
</script>

<nav class="sticky top-0 z-100 border-b border-stone-200 bg-white/10 p-8 backdrop-blur-sm">
    <ul class="mx-auto grid max-w-[120rem] grid-cols-3 items-center">
        <div class="flex">
            {#each menuItems as menuItem, i}
                <li>
                    <a class="block" class:ml-4={i > 0} href={menuItem.href}>
                        {menuItem.name}
                    </a>
                </li>
            {/each}
        </div>

        <div class="text-center">
            <h1 class="text-4xl font-bold">REVAR</h1>
        </div>

        <div class="flex items-center justify-end">
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

            <button class="ml-4 flex cursor-pointer items-center">
                {cartStore.getItems().length ? cartStore.getItems().length : ''}

                <Icon icon="mdi:cart" class="h-6 w-6 {cartStore.getItems().length ? 'ml-2' : ''}" />
            </button>
        </div>
    </ul>
</nav>
