<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from 'storybook/test';
    import Notification from '@atom/notification/notification.svelte';

    const { Story } = defineMeta({
        title: 'atom/notification',
        component: Notification,
    });

    const notification = {
        id: 99,
        title: 'Notification',
        message: 'This is a notification',
        onDismiss: fn(),
        timeoutId: setTimeout(() => {}, 0),
        duration: 1000,
        fade: true,
    };
</script>

<Story
    name="Success"
    args={{
        notification: {
            ...notification,
            variant: 'success-light-base',
        },
    }}
/>

<Story
    name="Warning"
    args={{
        notification: {
            ...notification,
            variant: 'warning-light-base',
        },
    }}
/>

<Story
    name="Error"
    args={{
        notification: {
            ...notification,
            variant: 'error-light-base',
        },
    }}
/>

<Story
    name="Info"
    args={{
        notification: {
            ...notification,
            variant: 'info-light-base',
        },
    }}
/>

<Story
    name="Neutral"
    args={{
        notification: {
            ...notification,
            variant: 'neutral-light-base',
        },
    }}
/>
