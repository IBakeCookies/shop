// interface DeepEffectOptions {
//     cb: () => unknown;
//     cleanup?: () => unknown;
//     isShallow?: boolean;
// }

// export function deepEffect(obj: Record<string, unknown>[], options: DeepEffectOptions): void {
//     const { cb, cleanup, isShallow = false } = options;

//     $effect(() => {
//         if (isShallow) {
//             Object.keys(obj);
//         } else {
//             recursiveKeys(obj);
//         }

//         cb();

//         return () => {
//             if (!cleanup) {
//                 return;
//             }

//             cleanup();
//         };
//     });
// }

// function recursiveKeys(obj: Record<string, unknown>, results = []): string[] {
//     const r = results;

//     for (const key in obj) {
//         const value = obj[key];

//         if (value && typeof value === 'object' && !Array.isArray(value)) {
//             recursiveKeys(value as Record<string, unknown>, r);
//         }
//     }

//     return r;
// }
