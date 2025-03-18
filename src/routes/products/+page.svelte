<script lang="ts">
    import type { PageProps } from './$types';
    import { setProductsStore } from '@store/productsStore.svelte';
    import ProductListItem from '@organism/productListItem/productListItem.svelte';

    let { data }: PageProps = $props();
    const productStore = setProductsStore(data.products);
</script>

<section class="mx-auto max-w-screen-2xl px-8 py-20">
    <h1 class="mb-8 text-3xl font-bold">Revar Polartec clothing</h1>

    {#if !productStore.products.length}
        <p>No products found</p>
    {:else}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {#each productStore.products as product}
                <a href={`/products/${product.slug}`}>
                    <ProductListItem
                        image={product.image}
                        variants={product.variants}
                        name={product.name}
                        price={product.price}
                    ></ProductListItem>
                </a>
            {/each}
        </div>
    {/if}
</section>
