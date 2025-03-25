import type { Storage, StorageKey } from '@storage/storage';

export class LocalStorage<R> implements Storage<R> {
    data: R | undefined;
    key: StorageKey | undefined;

    constructor(key: StorageKey) {
        this.key = key;
    }

    read() {
        if (!this.key) {
            return;
        }

        const data = localStorage.getItem(this.key);

        if (!data) {
            return;
        }

        return JSON.parse(data) as R;
    }

    write(data: R) {
        if (!this.key) {
            return;
        }

        localStorage.setItem(this.key, JSON.stringify(data));
    }

    clear() {
        if (!this.key) {
            return;
        }

        localStorage.removeItem(this.key);
    }
}
