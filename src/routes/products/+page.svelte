<script lang="ts">
	import ProductListing from '@organism/productListing/productListing.svelte';
	import { productsStore } from '@store/productsStore.svelte';
</script>

<section class="p-8">
	<h1 class="mb-8 text-3xl font-bold">Revar Alpha Clothing</h1>

	{#if !productsStore.products.length}
		<p>No products found</p>
	{:else}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
			{#each productsStore.products as product}
				<a href="/products/{product.slug}">
					<ProductListing
						image={product.image}
						colors={product.colors}
						name={product.name}
						price={product.price}
						salePrice={product.salePrice}
					></ProductListing>
				</a>
			{/each}
		</div>
	{/if}
</section>
