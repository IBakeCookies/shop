<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Alert from '@atom/alert/alert.svelte';

    const { Story } = defineMeta({
        title: 'atom/alert',
        component: Alert,

        argTypes: {
            variant: {
                control: {
                    type: 'select',
                },
                options: ['success', 'info', 'warning', 'error', 'state'],
            },
        },
    });
</script>

{#snippet children()}
    Free shipping on orders over €200 within Germany
{/snippet}

<Story
    name="Default"
    args={{
        children: children,
    }}
/>

<Story
    name="Success"
    args={{
        variant: 'success-light-base',
        children: children,
    }}
/>

<Story
    name="Warning"
    args={{
        variant: 'warning-light-base',
        children: children,
    }}
/>

<Story
    name="Error"
    args={{
        variant: 'error-light-base',
        children: children,
    }}
/>

<Story
    name="Info"
    args={{
        variant: 'info-light-base',
        children: children,
    }}
/>

<Story
    name="State dark"
    args={{
        variant: 'neutral-dark-base',
        children: children,
    }}
/>
