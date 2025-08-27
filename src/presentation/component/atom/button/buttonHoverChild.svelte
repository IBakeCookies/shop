<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    type Props = {
        class?: ClassValue;
        children?: Snippet;
    };

    const { children, ...props }: Props = $props();
</script>

<div {...props} class={cn('relative flex items-center')}>
    <div
        class="absolute left-full opacity-0 transition-all group-hover:translate-x-1/2 group-hover:opacity-100"
    >
        {@render children?.()}
    </div>
</div>
