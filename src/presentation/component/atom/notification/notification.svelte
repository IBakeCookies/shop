<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { ClassValue } from 'clsx';
    import type { Notification } from '@store/notificationStore.svelte';
    import { cn } from '@presentation/utils/style';
    import Icon from '@iconify/svelte';

    type Props = {
        notification: Notification;
        children?: Snippet;
        modifier?: ClassValue;
        dismiss?: (notificationId: number) => void;
    } & HTMLAttributes<any>;

    const { notification, children, dismiss, modifier, ...props }: Props =
        $props();

    const styles = $derived.by(() => {
        if (notification.type === 'success') {
            return {
                wrapper: 'text-emerald-700',
                iconAndMessage: 'text-emerald-900',
            };
        }

        if (notification.type === 'danger') {
            return {
                wrapper: 'text-red-700',
                iconAndMessage: 'text-red-900',
            };
        }

        if (notification.type === 'warning') {
            return {
                wrapper: 'text-amber-700',
                iconAndMessage: 'text-amber-900',
            };
        }

        if (notification.type === 'info') {
            return {
                wrapper: 'text-sky-700',
                iconAndMessage: 'text-sky-900',
            };
        }

        return {
            wrapper: 'text-stone-700',
            iconAndMessage: 'text-stone-900',
        };
    });

    const getAnimation = (duration: number) =>
        `animation-duration: ${duration}ms; animation-fill-mode: forwards`;

    const icons = {
        warning: 'mdi:warning',
        success: 'mdi:check',
        danger: 'mdi:warning-decagram',
        info: 'mdi:information-box',
        state: 'mdi:arrow-top-right-thin-circle-outline',
    };
</script>

<div
    {...props}
    class={cn(
        'notification relative flex items-start bg-stone-50 p-6 shadow-xl',
        modifier,
        styles.wrapper,
    )}
>
    <Icon
        class={`mr-6 min-h-6 min-w-6 ${styles.iconAndMessage}`}
        icon={icons[notification.type]}
    />

    <div class="mr-6">
        <div class:mb-2={notification.message} class="font-semibold">
            {@render children?.()}

            {#if notification.title}
                {@html notification.title}
            {/if}
        </div>

        {#if notification.message}
            <div class="font-semibold {styles.iconAndMessage}">
                {#if notification.message}
                    {@html notification.message}
                {/if}
            </div>
        {/if}
    </div>

    <button
        class="ml-auto cursor-pointer"
        onclick={() => dismiss && dismiss(notification.id)}
    >
        <Icon icon="mdi:close" />
    </button>

    <div
        style={notification.fade ? getAnimation(notification.duration) : ''}
        class="line absolute left-0 w-full"
    ></div>
</div>

<style>
    .line {
        bottom: -1px;
        height: 3px;
        background-color: currentColor;
        transform-origin: 0 0;
        transform: scaleX(1);
        animation-name: scaleX;
        animation-timing-function: linear;
    }

    @keyframes scaleX {
        0% {
            transform: scaleX(1);
        }
        100% {
            transform: scaleX(0);
        }
    }
</style>
