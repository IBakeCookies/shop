<script lang="ts">
    import type { PageProps } from './$types';
    import { fly } from 'svelte/transition';
    import { getProducts, setProductsStore } from '@store/productsStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import ProductListItem from '@organism/productListItem/productListItem.svelte';
    import Intersection from './intersection.svelte';

    let { data }: PageProps = $props();
    
    const size = 3;

    let isAllLoaded = $state(false);
    let start = 4;
    let end = start + size - 1;

    async function handleLoadMore() {
        const products = await getProducts({ 
            from: start,
            to: end,
        });

        productStore.products = [
            ...productStore.products,
            ...products,
        ]
        
        if(products.length < size) {
            isAllLoaded = true;
            
            return;
        }

        start += size;
        end += size;
    }

    const productStore = setProductsStore(data.products);
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

    {#if !isAllLoaded}
        <Intersection onIntersection={handleLoadMore} />
    {/if}
</section>
