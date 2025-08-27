interface FetcherOutput<I, O> {
    data: O | void;
    isLoading: boolean;
    error: Error | null;
    refresh(): Promise<O | void>;
    refresh(input: I): Promise<O | void>;
}

export function createReactiveData<O>(
    callback: () => Promise<O | void>,
): () => FetcherOutput<never, O>;

export function createReactiveData<I, O>(
    callback: (input: I) => Promise<O | void>,
): (input: I) => FetcherOutput<I, O>;

export function createReactiveData<I, O>(
    callback: (input?: I) => Promise<O | void>,
): (input?: I) => FetcherOutput<I, O> {
    const output = $state({
        data: undefined as O | void,
        isLoading: false,
        error: null as Error | null,
        refresh: undefined,
    });

    // let data: O | void = $state();
    // let isLoading = $state(false);
    // let error = $state<c>(null);

    return (input?: I) => {
        async function refresh(): Promise<O | void> {
            try {
                output.isLoading = true;
                output.error = null;
                output.data = await callback(input);

                // return data;
            } catch (err) {
                // createToast($t.error.connection, {
                //     color: 'danger',
                //     icon: alert,
                // });
                output.error = err instanceof Error ? err : new Error('An unknown error occurred');
            } finally {
                output.isLoading = false;
            }
        }

        refresh();

        output.refresh = refresh;

        return output;
    };
}
