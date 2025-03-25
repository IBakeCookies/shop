<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Loader from '@atom/loader/loader.svelte';

    const { Story } = defineMeta({
        title: 'atom/loader',
        component: Loader,

        args: {
            isRelative: false,
        },
    });
</script>

<Story
    name="Default"
    args={{
        auto: true,
    }}
/>

<Story
    name="Relative"
    args={{
        auto: true,
        isRelative: true,
    }}
/>
