<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Nav from '@organism/nav/nav.svelte';

    const { Story } = defineMeta({
        title: 'organism/nav',
        component: Nav,
    });

    const items = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Products',
            href: '/products',
        },
    ];
</script>

{#snippet brand()}
    REVAR
{/snippet}

<Story
    name="Default"
    args={{
        cartItemsCount: 0,
        items,
        children: brand,
    }}
/>

<Story
    name="With cart items"
    args={{
        cartItemsCount: 3,
        items,
        children: brand,
    }}
/>
