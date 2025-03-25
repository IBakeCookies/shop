<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';

    type Props = {
        value: string;
        size?: 'default' | 'small';
        class?: ClassValue;
    };

    const { size = 'default', value, ...props }: Props = $props();

    const styles: string = (() => {
        if (size === 'default') {
            return 'w-7 h-7';
        }

        return 'w-5 h-5';
    })();
</script>

<span
    {...props}
    title={value}
    class={cn(
        'absolute -top-3 -right-3 flex items-center justify-center border-2 border-stone-200 bg-stone-50 ',
        props.class,
        styles,
    )}
>
    %
</span>
