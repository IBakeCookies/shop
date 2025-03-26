<script lang="ts">
    import type { StylePath } from '@src/presentation/utils/variant';
    import type { Snippet } from 'svelte';
    import type { ClassValue, HTMLAttributes } from 'svelte/elements';
    import { getAlertVariantStyle } from '@src/presentation/utils/variant';
    import { cn } from '@presentation/utils/style';

    type Props = {
        ref?: null | HTMLElement;
        variant: StylePath;
        children: Snippet;
        class?: ClassValue;
    } & HTMLAttributes<any>;

    let {
        ref = $bindable(null),
        variant = 'neutral-light-base',
        children,
        ...props
    }: Props = $props();
</script>

<div
    {...props}
    bind:this={ref}
    class={cn('alert px-box border-b py-1', props.class, getAlertVariantStyle(variant))}
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
