<script lang="ts">
    import type { ClassValue } from 'clsx';
    import { cn } from '@presentation/utils/style';

    type Props = {
        value: string;
        variant?: 'default' | 'small';
        modifier?: ClassValue;
    };

    const { variant = 'default', modifier, value, ...props }: Props = $props();

    const styles: string = (() => {
        if (variant === 'default') {
            return 'w-6 h-6';
        }

        return 'w-5 h-5 text-sm';
    })();
</script>

<span
    {...props}
    title={value}
    class={cn(
        'absolute -top-3 -right-3 flex items-center justify-center border-2 border-stone-200 bg-stone-50 font-bold',
        modifier,
        styles,
    )}
>
    %
</span>
