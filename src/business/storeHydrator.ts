import { browser } from '$app/environment';

export function hydrateStore<T>(store: T, data: T): void {
    if (!browser) {
        return;
    }

    // const keys = Object.getOwnPropertyNames(store);

    for (const key in store) {
        store[key] = data[key];
    }
}

export function getIsomorphicData<T>(serverData: T, clientData: T): T {
    if (browser) {
        return clientData;
    }

    return serverData;
}
