<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { expect, userEvent, within } from '@storybook/test';
    import Input from '@atom/input/input.svelte';
    import Label from '@atom/label/label.svelte';

    const { Story } = defineMeta({
        title: 'atom/input',
        component: Input,
        args: {
            name: 'input'
        }
    });
</script>

{#snippet text()}
    Label
{/snippet}

<Story
    name="Default"
    play={async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByTestId('input'), 'email@provider.com');
    }}
/>

<Story name="With label top">
    <Label {text}>
        <Input name='input' />
    </Label>
</Story>

<Story name="With label left">
    <Label position="left" {text}>
        <Input name='input' />
    </Label>
</Story>
