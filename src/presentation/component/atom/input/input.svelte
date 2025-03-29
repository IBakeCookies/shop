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
        class?: ClassValue;
    } & HTMLInputAttributes;

    let { value = $bindable(), name, type = 'text', ...props }: Props = $props();
</script>

<input
    {...props}
    data-testid="input"
    {name}
    {type}
    bind:value
    class={cn('px-4 py-2 ring-2 ring-stone-200 focus-visible:outline-stone-300', props.class)}
/>
