<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { Snippet } from 'svelte';
    import { cn } from '@presentation/utils/style';

    type Props = {
        modifier?: ClassValue;
        children: Snippet;
        before?: Snippet;
    };

    const { modifier, children, before, ...restProps }: Props = $props();
</script>

<section {...restProps} class={cn('flex-1', modifier)}>
    {#if before}
        {@render before()}
    {/if}

    <div class="mx-auto max-w-screen-2xl">
        {@render children()}
    </div>
</section>
