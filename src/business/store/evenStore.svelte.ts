import { SvelteSet } from 'svelte/reactivity';

const state = new SvelteSet<string>();

export const eventStore = {
    add(event: string) {
        state.add(event);
    },

    remove(event: string) {
        state.delete(event);
    },

    hasAny(events: string[]) {
        return !!events.find((event) => state.has(event));
    },

    hasAll(events: string[]) {
        const sharedEvents = events.filter((event) => state.has(event));

        return sharedEvents.length === events.length;
    },

    hasOnly(events: string[]) {
        const sharedEvents = events.filter((event) => state.has(event));

        return sharedEvents.length === state.size;
    },
};
