// import axios, { isAxiosError } from 'axios';

// interface CatFactResponse {
//     fact: string;
//     length: number;
// }

// interface GenericError {
//     code: number;
//     message: string;
// }

// interface GenericResponse<T> {
//     code: number;
//     message: string;
//     data: T;
// }

// type CatFactFetcher = (url: string) => Promise<CatFactResponse>;

// function createFetcher<
//     Callback extends (...args: Parameters<Callback>) => ReturnType<Callback> | GenericError,
// >(callback: Callback) {
//     return async (...args: Parameters<Callback>): Promise<ReturnType<Callback> | GenericError> => {
//         try {
//             const res = await callback(...args);

//             // @ts-ignore
//             if (res.code >= 400) {
//                 return {
//                     code: res.code,
//                     message: res.message,
//                 } as GenericError;
//             }

//             return res;
//         } catch (err) {
//             console.log('err', err);

//             return err;
//         }
//     };
// }

// const catFactFetcher = createFetcher<CatFactFetcher>(async (url: string) => {
//     const raw = await fetch(`https://catfact.ninja${url}`);
//     const data: CatFactResponse = await raw.json();

//     return data;
// });

// (async () => {
//     const a = await catFactFetcher('/fsact');

//     console.log(123, a);
// })();

// type ResponseAndError<R, E = unknown> = { response: R; error: null } | { response: null; error: E };

interface GenericError {
    message: string;
}

export type UseErrorAsValueSuccessReturn<R> = {
    response: R | Awaited<R>;
    error: null;
};

export type UseErrorAsValueErrorReturn = {
    response: null;
    error: {
        cause: Error | GenericError | unknown;
        message?: string;
        code?: number;
    };
};

export async function useErrorAsValue<R>(
    cb: () => R | Promise<R>,
): Promise<UseErrorAsValueErrorReturn | UseErrorAsValueSuccessReturn<R>> {
    try {
        const response: R | Awaited<R> = await cb();

        return {
            response,
            error: null,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                response: null,
                error: {
                    cause: error,
                },
            };
        }

        return {
            response: null,
            error: {
                message: 'An unknown error occurred',
                cause: error as GenericError | unknown,
            },
        };
    }
}

export function getNumWithThrowChance(): number {
    if (Math.random() > 0.5) {
        return 123;
    }

    throw new Error('An error occurred');
}

(async () => {
    const { response, error } = await useErrorAsValue(getNumWithThrowChance);

    if (error === null) {
        console.log('result', response);

        return;
    }

    console.log('error', error);

    return;
})();

// (async () => {
//     const { response, error } = await useErrorAsValue(async () => {
//         return axios({
//             method: 'get',
//             url: 'https://catfact.ninja/fact',
//         });
//     })();

//     if (!error) {
//         console.log('result', response.data);

//         return;
//     }

//     console.error('error', error.code, error.message);
// })();
