<script lang="ts">
    import type { PageProps } from './$types';
    import Intersection from './intersection.svelte';
    import Icon from '@iconify/svelte';
    import { fly } from 'svelte/transition';
    import { setProductsStore } from '@store/productsStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import ProductListItem from '@organism/productListItem/productListItem.svelte';

    let { data }: PageProps = $props();

    const productStore = setProductsStore(data.products);

    async function handleLoadMore() {
        return productStore.getProducts();    
    }
</script>

<section in:fly={getFly()} class="px-box mx-auto max-w-screen-2xl py-20">
    <h1 class="mb-8 text-3xl">Revar Polartec clothing</h1>

    {#if !productStore.products.length}
        <p>No products found</p>
    {:else}
        <div class="gap-box grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {#each productStore.products as product}
                <a href={`/products/${product.slug}`}>
                    <ProductListItem
                        image={product.image}
                        variants={product.variants}
                        name={product.name}
                        price={product.price}
                    />
                </a>
            {/each}
        </div>
    {/if}

    {#if !productStore.isAllLoaded}
        <Intersection onIntersection={handleLoadMore} class="flex justify-center">
            <Icon icon="tdesign:load" class="h-6 w-6 animate-spin" />
        </Intersection>
    {/if}
</section>
