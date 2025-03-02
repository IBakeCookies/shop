<script lang="ts">
	import type { Tables } from '@data/type/database.types';
	import { cn } from '@presentation/utils/style';
	import Button from '@atom/button/button.svelte';
	import { eventStore } from '@store/evenStore.svelte';
	import { cartStore } from '@store/cartStore.svelte';

	const { product, ...restProps }: { product: Tables<'product'> } = $props();
	const isAddingToCart = $derived(eventStore.hasAny(['add-to-cart']));

	function addToCart() {
		eventStore.add('add-to-cart');

		setTimeout(() => {
			cartStore.addCartItem();

			eventStore.remove('add-to-cart');
		}, 500);
	}

	const sizes = new Set<string>(
		product.product_item.flatMap((item) =>
			item.product_variation.map((variation) => variation.size_option.size_reference.name)
		)
	);
</script>

<article class={cn('grid grid-cols-5 items-start', restProps.class)}>
	<div class="sticky top-[8rem] col-span-3">
		<img
			src="/{product.slug}/index.jpg"
			alt={product.product_translation.at(0)?.name}
			class="max-h-full max-w-full"
		/>
	</div>

	<div class="col-span-2 border-r border-l border-stone-200">
		<h2 class="p-8 text-5xl font-bold">
			{product.product_translation.at(0)?.name}
		</h2>

		<div class="border-t border-stone-200 p-8 text-stone-600">
			<p>{product.product_translation.at(0)?.description}</p>
		</div>

		<div class="border-t border-stone-200 p-8 text-stone-600">
			<h4 class="font-bold">Features</h4>

			<ul class="mt-4 italic">
				<li>Polartec Alpha Direct</li>
				<li>Fitted Hood with a Paracord Drawstring</li>
				<li>All-Season Active Insulation Layer</li>
				<li>Extremely Fast Wicking</li>
				<li>Highly Breathable</li>
				<li>Hydrophobic</li>
			</ul>
		</div>

		<form method="POST" action="?/addItemToCart">
			<div class="grid grid-cols-12 items-center border-t border-stone-200">
				<fieldset class="col-span-5 flex gap-4 p-8">
					{#each product.product_item as item}
						<label for={item.color.id} class="cursor-pointer">
							<input type="radio" name="color" value={item.color.id} id={item.color.id} required />
							{item.color.color_translation.at(0)?.name}
						</label>
					{/each}
				</fieldset>

				<fieldset class="col-span-5 flex gap-4 border-l border-stone-200 p-8">
					{#each Array.from(sizes) as size}
						<label for={size} class="cursor-pointer">
							<input type="radio" name="size" value={size} id={size} required />
							{size}
						</label>
					{/each}
				</fieldset>

				<fieldset class="border-l border-stone-200 p-8 text-2xl font-bold">
					<input type="number" class="max-w-20" value="1" required />
				</fieldset>
			</div>

			<fieldset class="flex items-center border-t border-stone-200">
				<div class="p-8 text-2xl font-bold">
					€ {product.product_item.at(0)?.price}
				</div>

				<div class="flex-1 border-l border-stone-200 p-8">
					<Button class="w-full" isLoading={isAddingToCart}>Add to cart</Button>
				</div>
			</fieldset>
		</form>

		<!-- <form method="POST" action="?/addItemToCart">
			<div class="grid grid-cols-12 items-center border-b border-stone-200">
				<fieldset class="col-span-5 flex gap-4 p-8">
					<label for="black" class="cursor-pointer rounded-4xl bg-black p-4">
						<input type="radio" name="color" value="black" id="black" required />
					</label>

					<label for="red" class="cursor-pointer rounded-4xl bg-red-500 p-4">
						<input type="radio" name="color" value="red" id="red" required />
					</label>

					
                    <li><button class="bg-red-500 p-4 rounded-4xl"></button></li>
                    <li><button class="bg-blue-600 p-4 rounded-4xl"></button></li>
                    <li><button class="bg-green-700 p-4 rounded-4xl"></button></li>
				</fieldset>

				<fieldset class="col-span-5 flex gap-4 border-l border-stone-200 p-8">
					<label for="xs" class="cursor-pointer rounded-3xl bg-stone-200 p-2">
						<input type="radio" name="size" value="xs" id="xs" required />
						XS
					</label>

					<label for="m" class="cursor-pointer rounded-3xl bg-stone-200 p-2">
						<input type="radio" name="size" value="m" id="m" required />
						M
					</label>
				</fieldset>

				<fieldset class="border-l border-stone-200 p-8 text-2xl font-bold">
					<input type="number" class="max-w-20" value="1" required />
				</fieldset>
			</div>

			<fieldset class="flex items-center border-b border-stone-200">
				<div class="p-8 text-2xl font-bold">
					€ {product.base_price}
				</div>

				<div class="flex-1 border-l border-stone-200 p-8">
					<Button class="w-full" isLoading={isAddingToCart}>Add to cart</Button>
				</div>
			</fieldset>
		</form> -->

		<div class="border-t border-stone-200 p-8">
			<h4 class="font-bold">Care instructions</h4>

			<p class="mt-4">{product.product_translation.at(0)?.care_instructions}</p>
		</div>

		<div class="border-t border-stone-200 p-8">
			<h4 class="font-bold">Content</h4>

			<p class="mt-4">{product.product_translation.at(0)?.about}</p>
		</div>
	</div>
</article>
