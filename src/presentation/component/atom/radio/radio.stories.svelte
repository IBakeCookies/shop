<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from '@storybook/test';
    import Radio from '@src/presentation/component/atom/radio/radio.svelte';

    const { Story } = defineMeta({
        title: 'atom/radio',
        component: Radio,
        args: {
            group: '',
            value: '125',
            variant: 'default',
            title: 'title',
            modifier: '',
        },
    });
</script>

{#snippet label()}
    Label
{/snippet}

{#snippet size()}
    XS
{/snippet}

<Story
    name="Default"
    args={{
        children: size,
    }}
/>

<Story
    name="With label"
    args={{
        children: size,
        label,
    }}
/>

<Story
    name="Empty"
    args={{
        size: 'square',
        backgroundColor: 'red',
    }}
/>

<Story name="Multiple">
    <div class="flex items-center gap-4">
        <Radio group="s" name="s">XS</Radio>
        <Radio group="s" name="s">S</Radio>
        <Radio group="s" name="s">XXL</Radio>
    </div>
</Story>
