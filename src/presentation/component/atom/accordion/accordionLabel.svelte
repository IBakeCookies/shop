<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import Icon from '@iconify/svelte';
    import { cn } from '@presentation/utils/style';

    interface Props {
        variant?: 'default' | 'bordered';
        icon?: string;
        isOpen: boolean;
        withIcon?: boolean;
        onclick?: () => void;
        class?: ClassValue;
        children: Snippet;
    }

    const { icon ='mdi:arrow-right', variant = 'default', isOpen, withIcon = true, children, ...props }: Props = $props();

    const style = {
        default: '',
        bordered: ' p-4 border border-gray-200',
    };
</script>

<button
    {...props}
    class={cn('flex cursor-pointer items-center text-left', style[variant], props.class)}
>
    <div class="w-full">    
        {@render children()}
    </div>

    {#if withIcon}
        <Icon 
            {icon} 
            class={cn("ml-2 min-h-6 min-w-6 -rotate-z-45 transition-transform",
            isOpen && 'rotate-z-45')}  />
    {/if}
</button>
