<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Money from '@atom/money/money.svelte';

    const { Story } = defineMeta({
        title: 'atom/money',
        component: Money,

        args: {
            value: 0,
            locale: 'en-US',
            precision: 2,
            currency: '€',
            withCurrency: true,
            modifier: '',
        },
    });
</script>

<Story
    name="Default"
    args={{
        value: 100,
    }}
/>
