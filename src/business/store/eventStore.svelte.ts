import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

const isDev = import.meta.env.DEV;
const CONTEXT_KEY = Symbol();

interface HistoryEvent {
    date: string | Date;
    name: string;
    removedDate: null | string | Date;
}

export class EventStore {
    events = new SvelteSet<string>();
    history: HistoryEvent[] = [];

    addEvent(event: string) {
        this.events.add(event);

        if (!isDev) {
            return;
        }

        this.history.push({
            date: new Date(),
            name: event,
            removedDate: null,
        });
    }

    removeEvent(event: string) {
        this.events.delete(event);

        if (isDev) {
            this.history.forEach((historyItem) => {
                if (historyItem.name === event) {
                    historyItem.removedDate = new Date();
                }
            });
        }
    }

    hasAny(events: string[]) {
        return !!events.find((event) => this.events.has(event));
    }

    hasAll(events: string[]) {
        const sharedEvents = events.filter((event) => this.events.has(event));

        return sharedEvents.length === events.length;
    }

    hasOnly(events: string[]) {
        const sharedEvents = events.filter((event) => this.events.has(event));

        return sharedEvents.length === this.events.size;
    }
}

export function setEventStore(eventStore = new EventStore()): EventStore {
    return setContext<EventStore>(CONTEXT_KEY, eventStore);
}

export function getEventStore(): EventStore {
    return getContext<EventStore>(CONTEXT_KEY);
}
