<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { ClassValue } from 'clsx';
    import { cn } from '@presentation/utils/style';

    type Props = {
        ref?: null | HTMLElement;

        type: 'success' | 'info' | 'warning' | 'error' | 'state' | 'state-dark';
        children: Snippet;
        modifier?: ClassValue;
    } & HTMLAttributes<any>;

    let {
        ref = $bindable(null),
        type = 'state',
        children,
        modifier,
        ...props
    }: Props = $props();

    const style = $derived.by(() => {
        if (type === 'success') {
            return 'bg-green-100 text-green-900 border-green-200';
        }

        if (type === 'info') {
            return 'bg-blue-100 text-white-900 border-blue-200';
        }

        if (type === 'warning') {
            return 'bg-yellow-100 text-yellow-900 border-yellow-200';
        }

        if (type === 'error') {
            return 'bg-red-100 text-red-900 border-red-200';
        }

        if (type === 'state') {
            return 'bg-stone-100 text-stone-900 border-stone-200';
        }

        if (type === 'state-dark') {
            return 'bg-stone-900 text-stone-100 border-stone-800';
        }

        return '';
    });
</script>

<div
    {...props}
    bind:this={ref}
    class={cn('alert border-b px-8 py-1', modifier, style)}
>
    <div class="mx-auto max-w-screen-2xl">
        {@render children()}
    </div>

    <!-- <div class="box-s max-w-container mx-auto flex items-start {borderColorStyle(type)} {$$props.class || ''}">    
        <Icon class="icon-sm mr-box-s {stateIconColorStyle(type)}" icon={IconType[type]} />
        
        <div class="grow">
            {#if hasTitle}
                <div class:mb-2={hasMessage} class="text-xl font-semibold {titleColorStyle(type)}">
                    <slot name="title">
                        {title}
                    </slot>
                </div>
            {/if}

            {#if hasMessage}
                <slot name="message">
                    <div class="{textColorStyle(type)}">{message}</div>
                </slot>
            {/if}
        </div>

        {#if closable}
            <Button class="ml-box !p-0 {closeButtonColorStyle(type)}" onClick={() => isOpen = false}>
                <Icon slot="icon" class="icon-sm rounded-full" icon="x" />
            </Button>
        {/if}
    </div> -->
</div>
