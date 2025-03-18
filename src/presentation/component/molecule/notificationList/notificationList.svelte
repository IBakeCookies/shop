<script lang="ts">
    import { getNotificationStore } from '@store/notificationStore.svelte';
    import Notification from '@atom/notification/notification.svelte';
    import { slide, fly } from 'svelte/transition';
    import { getFly } from '@presentation/utils/fly';

    const notificationStore = getNotificationStore();
</script>

{#each notificationStore.notifications as notification (notification.id)}
    <div transition:fly={getFly('fromTop')} class="w-full max-w-xl">
        <div transition:slide class="mb-6">
            <Notification
                {notification}
                dismiss={(id) => notificationStore.removeNotification(id)}
            />
        </div>
    </div>
{/each}
