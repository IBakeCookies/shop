<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from '@storybook/test';
    import Sale from '@atom/sale/sale.svelte';

    const { Story } = defineMeta({
        title: 'atom/sale',
        component: Sale,

        args: {
            value: 100,
            size: 'default',
        },
    });
</script>

<Story name="Default" />

<Story
    name="Small"
    args={{
        size: 'small',
    }}
/>
