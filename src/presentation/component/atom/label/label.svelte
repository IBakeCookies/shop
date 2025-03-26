<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    interface Props {
        title?: string;
        position?: 'top' | 'left';
        disabled?: boolean;
        class?: ClassValue;
        text?: Snippet;
        children?: Snippet;
    }

    let { title, children, disabled, position = 'top', text, ...props }: Props = $props();

    const styles = (() => {
        if (position === 'top') {
            return {
                wrapper: '',
                label: 'mb-2',
            };
        }

        return {
            wrapper: 'flex items-center',
            label: 'mr-4',
        };
    })();
</script>

<label
    {...props}
    {title}
    class={cn('has-disabled:opacity-50', props.class, styles.wrapper)}
    class:cursor-pointer={!disabled}
>
    {#if text}
        <div class={styles.label}>
            {@render text()}
        </div>
    {/if}

    {@render children?.()}
</label>
