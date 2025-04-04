<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { slide } from 'svelte/transition';
    import { cn } from '@presentation/utils/style';

    interface Props {
        isOpen?: boolean;
        variant?: 'default' | 'bordered';
        onToggle?: () => void;
        class?: ClassValue;
        children: Snippet;
    }

    const {
        variant = 'default',
        isOpen = false,
        onToggle = () => {},
        children,
        ...props
    }: Props = $props();

    const style = {
        default: '',
        bordered: 'border border-gray-200',
    };
</script>

{#if isOpen}
    <ul {...props} class={cn('mt-4', style[variant], props.class)} transition:slide>
        {@render children()}
    </ul>
{/if}
