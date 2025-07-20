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
    let data: O | void = $state();
    let isLoading = $state(false);
    let error = $state<Error | null>(null);

    return (input?: I) => {
        async function refresh(): Promise<O | void> {
            try {
                isLoading = true;
                error = null;
                data = await callback(input);

                return data;
            } catch (err) {
                // createToast($t.error.connection, {
                //     color: 'danger',
                //     icon: alert,
                // });
                error = err instanceof Error ? err : new Error('An unknown error occurred');
            } finally {
                isLoading = false;
            }
        }

        refresh();

        return {
            data,
            isLoading,
            error,
            refresh,
        };
    };
}
