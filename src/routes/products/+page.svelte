<script lang="ts">
    import { productsStore } from '@store/productsStore.svelte';
    import ProductListing from '@organism/productListing/productListing.svelte';
</script>

<section class="mx-auto max-w-screen-2xl p-8">
    <h1 class="mb-8 text-3xl font-bold">Revar Polartec clothing</h1>

    {#if !productsStore.products.length}
        <p>No products found</p>
    {:else}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {#each productsStore.products as product (product.id)}
                <a href="/products/{product.slug}">
                    <ProductListing
                        image={product.image}
                        variants={product.variants}
                        name={product.name}
                        price={product.price}
                    ></ProductListing>
                </a>
            {/each}
        </div>
    {/if}
</section>
