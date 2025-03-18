<script lang="ts">
    import type { ClassValue } from 'clsx';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { cn } from '@presentation/utils/style';

    type Props = {
        group: string | undefined;
        variant: 'circle-with-label' | 'box';
        modifier?: ClassValue;
        style?: string;
        title?: string;
        children?: Snippet;
    } & HTMLInputAttributes;

    interface Style {
        label: string;
        text: string;
        input: string;
        inputWrapper: string;
    }

    let {
        group = $bindable(),
        variant = 'box',
        modifier,
        children,
        style,
        title,
        ...props
    }: Props = $props();

    const styles: Style = $derived.by(() => {
        if (variant === 'circle-with-label') {
            return {
                label: '',
                text: 'pl-2',
                input: 'peer appearance-none h-5 w-5 border border-stone-300 transition-all checked:border-stone-400',
                inputWrapper: 'relative flex items-center',
            };
        }

        let size = 'px-3 py-1';

        if (style) {
            size = 'w-8 h-8';
        }

        return {
            label: `${size} outline-offset-2 relative transition-colors bg-stone-200 outline-2 outline-transparent has-focus-visible:outline-stone-600 has-checked:outline-stone-600`,
            text: '',
            input: 'opacity-0 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none',
            inputWrapper: '',
        };
    });
</script>

<label
    class={cn(
        'flex items-center has-disabled:opacity-50',
        styles.label,
        modifier,
    )}
    class:cursor-pointer={!props.disabled}
    {style}
    {title}
>
    <div class={styles.inputWrapper}>
        <input
            {...props}
            bind:group
            class={styles.input}
            type="radio"
            name={props.name}
        />

        {#if variant === 'circle-with-label'}
            <span
                class="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform bg-stone-800 opacity-0 transition-opacity peer-checked:opacity-100"
            >
            </span>
        {/if}
    </div>

    {#if children}
        <span class={styles.text}>
            {@render children()}
        </span>
    {/if}
</label>
