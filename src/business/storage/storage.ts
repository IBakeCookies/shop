export type StorageKey = 'revar-cart' | 'user';

export interface Storage<R> {
    read: () => R | void;
    write: (data: R) => void;
    clear: () => void;
}

export interface GenericStorage {
    setItem: (key: StorageKey, value: string) => void;
    getItem: (key: StorageKey) => string | null;
}

export class CreateStorage<R> implements Storage<R> {
    data: R | null = null;
    key: StorageKey | null = null;
    storage: () => GenericStorage;

    constructor(key: StorageKey, storage: () => GenericStorage) {
        this.key = key;
        this.storage = storage;
    }

    read() {
        if (!this.key) {
            return;
        }

        const data = this.storage().getItem(this.key);

        if (!data) {
            return;
        }

        return JSON.parse(data) as R;
    }

    write(data: R) {
        if (!this.key) {
            return;
        }

        this.storage().setItem(this.key, JSON.stringify(data));
    }

    clear() {
        if (!this.key) {
            return;
        }

        this.storage().setItem(this.key, '');
    }
}
