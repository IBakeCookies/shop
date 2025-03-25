<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import Label from '@atom/label/label.svelte';

    type Props = {
        group: string;
        title?: string;
        variant?: 'default';
        size?: 'default' | 'square';
        class?: ClassValue;
        disabled?: boolean;
        backgroundColor?: string;
        label?: Snippet;
        children?: Snippet;
    } & HTMLInputAttributes;

    let {
        title,
        group = $bindable(),
        variant = 'default',
        size = 'default',
        disabled,
        backgroundColor,
        children,
        label,
        ...props
    }: Props = $props();

    const labelStyleVariant: string = (() => {
        switch (size) {
            case 'default':
                return 'px-3 py-1';

            case 'square':
                return 'w-8 h-8';
        }
    })();
</script>

<Label {title} {disabled} class={props.class}>
    {#snippet text()}
        {@render label?.()}
    {/snippet}
   
    <div
        style={`background-color: ${backgroundColor}`}
        class={`relative flex items-center bg-stone-200 outline-2 outline-offset-2 outline-transparent transition-colors has-checked:outline-stone-600 has-focus-visible:outline-stone-600 ${labelStyleVariant}`}
    >
        <input
            {...props}
            bind:group
            class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0"
            type="radio"
            name={props.name}
            {disabled}
        />

        {#if children}
            {@render children()}
        {/if}
    </div>
</Label>
