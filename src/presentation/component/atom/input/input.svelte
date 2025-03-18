<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { cn } from '@presentation/utils/style';

    type Props = {
        group?: string;
        variant?: 'default';
        modifier?: ClassValue;
        title?: string;
        children?: Snippet;
    } & HTMLInputAttributes;

    let {
        group = $bindable(),
        variant = 'default',
        modifier,
        children,
        title,
        ...props
    }: Props = $props();
</script>

<label
    class={cn('block has-disabled:opacity-50', modifier)}
    class:cursor-pointer={!props.disabled}
    {title}
>
    {#if children}
        <span class="mb-2 block">
            {@render children()}
        </span>
    {/if}

    <input
        {...props}
        bind:group
        class="w-full px-4 py-2 ring-2 ring-stone-200 focus-visible:outline-stone-400"
        name={props.name}
        type="text"
    />
</label>
