import type { StylePath } from '@src/presentation/utils/variant';
import { getContext, setContext } from 'svelte';

export interface NotificationInput {
    title: string;
    variant: StylePath;
    message?: string;
    fade?: boolean;
    duration?: number;
    dismiss?: () => void;
}

export type Notification = {
    id: number;
    timeoutId: null | ReturnType<typeof setTimeout>;
} & Omit<NotificationInput, 'duration' | 'fade'> & Required<Pick<NotificationInput, 'duration' | 'fade'>>

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
        variant = 'success-light-base',
        fade = true,
        duration,
        dismiss,
    }: NotificationInput): void {
        const id = getNewId();
        const minDuration = 2000;
        const dynamicDuration = duration || minDuration + message?.length * 20 + title.length * 20;
        let timeoutId: null | ReturnType<typeof setTimeout> = null;

        if (fade) {
            timeoutId = setTimeout(() => {
                const notificationToRemoveIndex = this.notifications.findIndex((notification) => {
                    return notification.id === id;
                });

                this.notifications.splice(notificationToRemoveIndex, 1);

                if (dismiss) {
                    dismiss();
                }
            }, dynamicDuration);
        }

        this.notifications.push({
            id,
            variant,
            title,
            message,
            fade,
            duration: dynamicDuration,
            dismiss,
            timeoutId,
        });
    }

    removeNotification(id: number): void {
        const notificationToRemove = this.notifications.find(
            (notification) => notification.id === id,
        );

        if (notificationToRemove) {
            notificationToRemove.timeoutId && clearTimeout(notificationToRemove.timeoutId);

            if (notificationToRemove.dismiss) {
                notificationToRemove.dismiss();
            }
        }

        const notificationToRemoveIndex = this.notifications.findIndex((notification) => {
            return notification.id === id;
        });

        this.notifications.splice(notificationToRemoveIndex, 1);
    }
}

export function setNotificationStore(notificationStore = new NotificationStore()) {
    return setContext<NotificationStore>(CONTEXT_KEY, notificationStore);
}

export function getNotificationStore() {
    return getContext<NotificationStore>(CONTEXT_KEY);
}
