<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import Icon from '@iconify/svelte';

    type Props = {
        href?: string;
        iconL?: string;
        iconR?: string;
        // events?: string[];
        isLoading?: boolean;
        variant?: 'primary' | 'secondary' | 'anchor';
        disabled?: boolean;
        modifier?: ClassValue;
        children: Snippet;
    } & (HTMLAnchorAttributes | HTMLButtonAttributes);

    const {
        href,
        iconL,
        iconR,
        // events,
        isLoading,
        variant = 'primary',
        disabled,
        modifier,
        children,
        ...restProps
    }: Props = $props();

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
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    {...restProps}
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
    {#if iconL}
        <Icon icon={iconL} class="mr-4 h-6 w-6" />
    {/if}

    {@render children()}

    {#if iconR}
        <Icon icon={iconR} class="ml-4 h-6 w-6" />
    {/if}

    {#if isLoading}
        <Icon icon="bi:arrow-repeat" class="ml-4 h-6 w-6 animate-spin" />
    {/if}

    {#if href}
        <span
            class="absolute top-full left-0 h-1 w-full origin-left scale-x-0 bg-stone-900 transition-transform group-hover:scale-x-100"
        >
        </span>
    {/if}
</svelte:element>
