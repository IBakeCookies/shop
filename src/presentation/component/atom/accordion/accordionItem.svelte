<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    interface Props {
        variant?: 'default' | 'bordered';
        class?: ClassValue;
        children: Snippet;
    }

    const { variant = 'default', children, ...props }: Props = $props();

    const style = {
        default: '',
        bordered: 'p-4 border border-gray-200',
    };
</script>

<li {...props} class={cn('', style[variant], props.class)}>
    {@render children()}
</li>
