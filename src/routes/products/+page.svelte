<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	$inspect(data);
</script>

<section class="p-10">
	<h1 class="mb-10 text-3xl font-bold">Revar Alpha 60 Clothing</h1>

	{#if !data.products?.length}
		<p>No products found</p>
	{:else}
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			{#each data.products as product}
				<a href="/products/{product.slug}" class="flex flex-col border border-stone-200">
					<div class="py-10">
						<div class="relative">
							<img
								src="/{product.slug}/index.jpg"
								alt={product.slug}
								class="max-h-100 max-w-full self-center"
							/>

							<ul class="flex absolute top-full left-full -translate-x-full">
								{#each product.product_item as item}
									<li 
										class="p-3 mr-3" 
										style="background-color:{item.color.color_translation.at(0)?.name}">
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<div class="p-8 font-bold bg-stone-100">
						<!-- <ul class="flex">
							{#each product.items as item}
								<li class="p-2 rounded-xl mr-4" style="background-color:{item.color.translation.at(0)?.name}"></li>
							{/each}
						</ul> -->

						<div class="flex items-center justify-between">
							<h2 class="text-xl flex items-center">
								{product.product_translation.at(0)?.name}
							</h2>
	
							<money class="ml-4">
								€ {product.product_item.at(0)?.price}
							</money>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>
