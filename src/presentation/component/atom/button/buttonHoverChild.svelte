<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    type Props = {
        class?: ClassValue;
        child: Snippet;
        children: Snippet;
    };

    const { child, children, ...props }: Props = $props();
</script>

<div {...props} class={cn('relative flex items-center')}>
    {@render children()}

    <div
        class="absolute left-full opacity-0 transition-all group-hover:translate-x-1/2 group-hover:opacity-100"
    >
        {@render child()}
    </div>
</div>
