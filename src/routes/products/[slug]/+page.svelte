<script lang="ts">
import ProductDetails from '@organism/productDetails/productDetails.svelte';

let { data, form } = $props();

$inspect(data);
</script>

<ProductDetails product={data.product}></ProductDetails>
