<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Number from '@atom/number/number.svelte';

    const { Story } = defineMeta({
        title: 'atom/number',
        component: Number,

        // args: {
        //     value: 0,
        //     locale: 'en-US',
        //     precision: 2,
        // },
    });
</script>

<Story
    name="Default"
    args={{
        value: 100,
    }}
/>
