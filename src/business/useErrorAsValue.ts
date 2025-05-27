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

export type UseErrorAsValueReturn<R> = R extends unknown
    ? {
          response: null;
          error: Error | GenericError | unknown;
      }
    : {
          response: R;
          error: null;
      };

// interface UseErrorAsValueReturn<R = unknown, E = unknown> {
//     response: R;
//     error: E;
// }

export async function useErrorAsValue<R>(cb: () => Promise<R>) {
    try {
        const response = await cb();

        return {
            response: response,
            error: null,
        };
    } catch (error: GenericError | Error | unknown) {
        return {
            response: null,
            error: error,
        };
    }
}

export function getError(a: boolean): number | GenericError {
    if (a) {
        return 123;
    }

    return {
        message: 'ERROR',
    };
}

(async () => {
    const result = await useErrorAsValue(async () => {
        return getError(false);
    });

    // Check using the object's properties
    if (result.error === null) {
        // TypeScript now knows response is number here
        console.log('result', result.response);
    }

    // TypeScript knows response is null here
    console.log('error', result.error);

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
