<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Button from '@atom/button/button.svelte';

    const { Story } = defineMeta({
        title: 'atom/button',
        component: Button,
        args: {
            isLoading: false,
            disabled: false,
        },
        argTypes: {
            size: {
                control: {
                    type: 'select',
                },
                options: ['default', 'small', 'tiny', 'square'],
            },
        },
    });
</script>

{#snippet children()}
    Button
{/snippet}

{#snippet icon()}
    x
{/snippet}

<Story
    name="Neutral dark"
    args={{
        children,
    }}
/>

<Story
    name="Neutral dark outline"
    args={{
        variant: 'neutral-dark-outline',
        children,
    }}
/>

<Story
    name="Neutral light"
    args={{
        variant: 'neutral-light-base',
        children,
    }}
/>

<Story
    name="Neutral light outline"
    args={{
        variant: 'neutral-light-outline',
        children,
    }}
/>

<Story
    name="Success dark"
    args={{
        variant: 'success-dark-base',
        children,
    }}
/>

<Story
    name="Success dark outline"
    args={{
        variant: 'success-dark-outline',
        children,
    }}
/>

<Story
    name="Success light"
    args={{
        variant: 'success-light-base',
        children,
    }}
/>

<Story
    name="Success light outline"
    args={{
        variant: 'success-light-outline',
        children,
    }}
/>

<Story
    name="Error dark"
    args={{
        variant: 'error-dark-base',
        children,
    }}
/>

<Story
    name="Error outline"
    args={{
        variant: 'error-dark-outline',
        children,
    }}
/>

<Story
    name="Error light"
    args={{
        variant: 'error-light-base',
        children,
    }}
/>

<Story
    name="Error light outline"
    args={{
        variant: 'error-light-outline',
        children,
    }}
/>

<Story
    name="Warning dark"
    args={{
        variant: 'warning-dark-base',
        children,
    }}
/>

<Story
    name="Warning outline"
    args={{
        variant: 'warning-dark-outline',
        children,
    }}
/>

<Story
    name="Warning light"
    args={{
        variant: 'warning-light-base',
        children,
    }}
/>

<Story
    name="Warning light outline"
    args={{
        variant: 'warning-light-outline',
        children,
    }}
/>

<Story
    name="Info dark"
    args={{
        variant: 'info-dark-base',
        children,
    }}
/>

<Story
    name="Info outline"
    args={{
        variant: 'info-dark-outline',
        children,
    }}
/>

<Story
    name="Info light"
    args={{
        variant: 'info-light-base',
        children,
    }}
/>

<Story
    name="Info light outline"
    args={{
        variant: 'info-light-outline',
        children,
    }}
/>

<Story
    name="Square"
    args={{
        size: 'square',
        children: icon,
    }}
/>
