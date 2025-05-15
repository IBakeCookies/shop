<script lang="ts">
    import type { NotificationInput } from '@store/notificationStore.svelte';
    import type { Snippet } from 'svelte';
    import type { ClassValue, HTMLAttributes } from 'svelte/elements';
    import Icon from '@iconify/svelte';
    import { getNotificationVariantStyle } from '@src/presentation/utils/variant';
    import { cn } from '@presentation/utils/style';

    type Props = {
        notification: NotificationInput;
        children?: Snippet;
        class?: ClassValue;
        dismiss: (id: number) => void;
    } & HTMLAttributes<any>;

    const { notification, dismiss, children, ...props }: Props = $props();

    const styles = getNotificationVariantStyle(notification.variant);

    const getAnimation = (duration: number) =>
        `animation-duration: ${duration}ms; animation-fill-mode: forwards`;

    const icons = {
        'warning-light-base': 'mdi:warning',
        'success-light-base': 'mdi:check',
        'error-light-base': 'mdi:warning-decagram',
        'info-light-base': 'mdi:information-box',
        'neutral-light-base': 'mdi:arrow-top-right-thin-circle-outline',
    };
</script>

<div
    {...props}
    class={cn(
        'notification relative flex items-start border border-stone-200 bg-stone-50 p-6 shadow-xl',
        props.class,
        styles.title,
    )}
>
    <Icon class="mr-6 min-h-6 min-w-6" icon={icons[notification.variant]} />

    <div class="mr-6">
        <div class:mb-2={notification.message} class="text-lg font-semibold">
            {@render children?.()}

            {#if notification.title}
                {@html notification.title}
            {/if}
        </div>

        {#if notification.message}
            <div class={`font-semibold ${styles.body}`}>
                {#if notification.message}
                    {@html notification.message}
                {/if}
            </div>
        {/if}
    </div>

    <button class="ml-auto cursor-pointer" onclick={() => dismiss && dismiss(notification.id)}>
        <Icon icon="mdi:close" />
    </button>

    <div
        style={notification.fade ? getAnimation(notification.duration) : ''}
        class="line absolute left-0 w-full bg-current"
    ></div>
</div>

<style>
    .line {
        bottom: -1px;
        height: 3px;
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
