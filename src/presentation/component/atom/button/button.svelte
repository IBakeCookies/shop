<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { Snippet } from 'svelte';
    import type {
        HTMLButtonAttributes,
        HTMLAnchorAttributes,
    } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import type Icon from '@iconify/svelte';

    type Props = {
        href?: string;
        isLoading?: boolean;
        variant?: 'primary' | 'secondary' | 'anchor' | 'icon';
        disabled?: boolean;
        modifier?: ClassValue;
        children?: Snippet;
    } & (HTMLAnchorAttributes | HTMLButtonAttributes);

    const {
        href,
        isLoading,
        variant = 'primary',
        disabled,
        modifier,
        children,
        ...props
    }: Props = $props();

    let DynamicIcon: typeof Icon | null = $state(null);

    const currentVariant: string = $derived.by(() => {
        if (variant === 'anchor') {
            return 'group relative font-bold';
        }

        if (variant === 'primary') {
            return 'px-8 py-3 border-1 border-transparent bg-stone-900 text-stone-100 hover:bg-stone-700';
        }

        if (variant === 'secondary') {
            return 'px-8 py-3 border-1 border-stone-200 text-stone-90 bg-white/70 backdrop-blur-sm hover:bg-stone-200';
        }

        return '';
    });

    $effect(() => {
        if (!isLoading) {
            return;
        }

        import('@iconify/svelte').then((module) => {
            DynamicIcon = module.default;
        });
    });
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    {...props}
    {href}
    class={cn(
        'a-button inline-flex cursor-pointer items-center justify-center transition-colors disabled:bg-zinc-500',
        currentVariant,
        modifier,
        {
            'pointer-events-none': isLoading || disabled,
        },
    )}
    disabled={isLoading || disabled}
>
    {@render children?.()}

    {#if isLoading && DynamicIcon}
        <DynamicIcon icon="bi:arrow-repeat" class="ml-4 h-6 w-6 animate-spin" />
    {/if}

    {#if href}
        <span
            class="absolute top-full left-0 h-[2px] w-full origin-left scale-x-0 bg-stone-900 transition-transform group-hover:scale-x-100"
        >
        </span>
    {/if}
</svelte:element>
