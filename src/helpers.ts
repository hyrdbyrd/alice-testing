export class DataBase<T> {
    private debounceTimer: Record<string, number | undefined> = {};

    constructor(
        private clearTimeout: number = 1000 * 60 * 5,
        private db: Record<string, T> = {}
    ) {}

    private refreshTimeoutLoop(key: string) {
        if (this.debounceTimer[key]) {
            clearTimeout(this.debounceTimer[key]);
            this.debounceTimer[key] = undefined;
        }

        if (!this.debounceTimer[key])
            this.debounceTimer[key] = setTimeout(() => delete this.db[key], this.clearTimeout) as unknown as number;
    }

    public add(key: string, value: T) {
        this.refreshTimeoutLoop(key);
        this.db[key] = value;
    }

    public get(key: string) {
        if (this.db[key])
            this.refreshTimeoutLoop(key);

        return this.db[key];
    }
};