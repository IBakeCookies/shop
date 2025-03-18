export interface Storage<R> {
    read: () => R | void;
    write: (data: R) => void;
}

export class LocalStorage<R> implements Storage<R> {
    data: R | undefined;
    key: string | undefined;

    constructor(key: string) {
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
}
