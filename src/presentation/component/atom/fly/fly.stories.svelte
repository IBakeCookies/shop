<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Fly from '@atom/fly/fly.svelte';

    const { Story } = defineMeta({
        title: 'atom/fly',
        component: Fly,

        args: {
            type: 'inOut',
            direction: 'fromBottom',
            index: 0,
            limit: 0,
            modifier: '',
        },
    });
</script>

{#snippet children()}
    Children
{/snippet}

<Story
    name="Default"
    args={{
        children,
    }}
/>
