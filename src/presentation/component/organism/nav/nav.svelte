<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '@atom/button/button.svelte';
	import { cartStore } from '@store/cartStore.svelte';

	const menuItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Products', href: '/products' }
	];

	const userItems = [{ name: 'Login', href: '/login' }];
</script>

<nav class="absolute top-0 left-0 z-10 w-full bg-transparent p-10 text-2xl text-white">
	<ul class="flex justify-between">
		<div class="flex items-center">
			{#each menuItems as menuItem, i}
				<li>
					<a class="block" class:ml-4={i > 0} href={menuItem.href}>
						{menuItem.name}
					</a>
				</li>
			{/each}
		</div>

		<div class="ml-0.5 flex items-center">
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

			<button class="ml-4 flex cursor-pointer">
				{cartStore.getItems().length ? cartStore.getItems().length : ''}

				<Icon icon="mdi:cart" class={`h-6 w-6 ${cartStore.getItems().length ? 'ml-2' : ''}`} />
			</button>
		</div>
	</ul>
</nav>
