class PageStore {
    private _navHeight = 0;

    public set navHeight(navHeight: number) {
        this._navHeight = navHeight;
    }

    public get navHeight(): number {
        return this._navHeight;
    }
}

export const pageStore = new PageStore();
