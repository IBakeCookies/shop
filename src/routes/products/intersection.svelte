<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { onMount } from 'svelte';
    import { cn } from '@presentation/utils/style';

    interface Props {
        once?: boolean;
        threshold?: number;
        rootMargin?: string;
        onIntersection?: (entry: IntersectionObserverEntry) => void;
        onNoIntersection?: (entry: IntersectionObserverEntry) => void;
        class?: ClassValue;
        children?: Snippet;
    }

    const {
        once,
        rootMargin,
        threshold,
        onIntersection,
        onNoIntersection,
        children,
        ...props
    }: Props = $props();

    const options: IntersectionObserverInit = {
        rootMargin,
        threshold,
    };

    let isIntersecting: boolean = $state(false);
    let element = $state<HTMLDivElement | null>(null);
    let observer: IntersectionObserver | null = null;

    const callback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                onNoIntersection && onNoIntersection(entry);

                return;
            }

            onIntersection?.(entry);

            isIntersecting = true;

            if (once && element) {
                observer.unobserve(element);
            }
        });
    };

    onMount(() => {
        if (!element) {
            return;
        }

        observer = new IntersectionObserver(callback, options);

        observer.observe(element);

        return () => {
            if (!element) {
                return;
            }

            observer?.unobserve(element);
        };
    });
</script>

<div bind:this={element} {...props} class={cn('py-4', props.class)}>
    {#if isIntersecting}
        {@render children?.()}
    {/if}
</div>
