<script lang="ts">
    import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    type Props = {
        value?: string | number;
        name: string;
        type?:
            | 'text'
            | 'password'
            | 'email'
            | 'tel'
            | 'number'
            | 'search'
            | 'url'
            | 'date'
            | 'time'
            | 'datetime-local'
            | 'month'
            | 'week';
        variant?: 'default';
        class?: ClassValue;
    } & HTMLInputAttributes;

    let {
        value = $bindable(),
        variant = 'default',
        name,
        type = 'text',
        children,
        ...props
    }: Props = $props();
</script>

<input
    {...props}
    data-testid="input"
    {name}
    {type}
    bind:value
    class={cn('px-4 py-2 ring-2 ring-stone-200 focus-visible:outline-stone-300', props.class)}
/>
