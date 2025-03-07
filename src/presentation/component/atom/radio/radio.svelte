<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { cn } from '@presentation/utils/style';

    type Props = {
        group: string | undefined;
        modifier?: ClassValue;
        children: Snippet;
    } & HTMLInputAttributes;

    let { group = $bindable(), modifier, children, ...restProps }: Props = $props();
</script>

<label
    class={cn('flex items-center has-disabled:opacity-50', modifier)}
    class:cursor-pointer={!restProps.disabled}
>
    <div class="relative flex items-center">
        <input
            {...restProps}
            bind:group
            class="peer h-5 w-5 appearance-none rounded-full border border-stone-300 transition-all checked:border-stone-400"
            type="radio"
        />

        <span
            class="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-stone-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
        >
        </span>
    </div>

    {#if children}
        <span class="pl-2 text-sm text-stone-600">
            {@render children()}
        </span>
    {/if}
</label>
