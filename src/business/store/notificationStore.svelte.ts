import { getContext, setContext } from 'svelte';

type NotificationType = 'success' | 'danger' | 'warning' | 'info' | 'state';

interface NotificationInput {
    title: string;
    message?: string;
    type?: NotificationType;
    fade?: boolean;
    duration?: number;
    callback?: () => void;
}

export interface Notification extends NotificationInput {
    id: number;
    timeoutId: null | ReturnType<typeof setTimeout>;

    // overwrite
    duration: number;
    type: NotificationType;
    fade: boolean;
}

const getNewId = (() => {
    let id = -1;

    return () => {
        id += 1;

        return id;
    };
})();

const CONTEXT_KEY = Symbol();

export class NotificationStore {
    notifications = $state<Notification[]>([]);

    addNotification({
        title,
        message = '',
        type = 'success',
        fade = true,
        duration,
        callback,
    }: NotificationInput): void {
        const id = getNewId();
        const minDuration = 2000;

        const dynamicDuration =
            duration || minDuration + message?.length * 30 + title.length * 30;

        let timeoutId: null | ReturnType<typeof setTimeout> = null;

        if (fade) {
            timeoutId = setTimeout(() => {
                const notificationToRemoveIndex = this.notifications.findIndex(
                    (notification) => {
                        return notification.id === id;
                    },
                );

                this.notifications.splice(notificationToRemoveIndex, 1);

                if (callback) {
                    callback();
                }
            }, dynamicDuration);
        }

        this.notifications.push({
            id,
            type,
            title,
            message,
            fade,
            duration: dynamicDuration,
            callback,
            timeoutId,
        });
    }

    removeNotification(id: number): void {
        const notificationToRemove = this.notifications.find(
            (notification) => notification.id === id,
        );

        if (notificationToRemove) {
            notificationToRemove.timeoutId &&
                clearTimeout(notificationToRemove.timeoutId);

            if (notificationToRemove.callback) {
                notificationToRemove.callback();
            }
        }

        const notificationToRemoveIndex = this.notifications.findIndex(
            (notification) => {
                return notification.id === id;
            },
        );

        this.notifications.splice(notificationToRemoveIndex, 1);
    }
}

export function setNotificationStore(
    notificationStore = new NotificationStore(),
) {
    return setContext<NotificationStore>(CONTEXT_KEY, notificationStore);
}

export function getNotificationStore() {
    return getContext<NotificationStore>(CONTEXT_KEY);
}
