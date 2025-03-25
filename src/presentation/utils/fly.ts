import type { FlyParams } from 'svelte/transition';

export type Direction = 'fromBottom' | 'fromTop' | 'fromLeft' | 'fromRight' | 'opacity';

export interface AdditionalConfig {
    index?: number;
    limit?: number;
    interval?: number;
}

export const moveX = 30;

export const moveY = 30;

export const duration = {
    default: 300,
};

export const delayInterval = {
    default: 50,
};

export const opacity = 0;

const config = {
    opacity,
    duration: duration.default,
};

const flyDirections: Record<Direction, FlyParams> = {
    fromBottom: {
        ...config,
        y: moveY,
    },
    fromTop: {
        ...config,
        y: -moveY,
    },
    fromLeft: {
        ...config,
        x: -moveX,
    },
    fromRight: {
        ...config,
        x: moveX,
    },
    opacity: {
        ...config,
    },
};

export function getFly(
    direction: Direction = 'fromBottom',
    config: FlyParams = {},
    additionalConfig: AdditionalConfig = {},
): FlyParams {
    const { index = 0, limit = 0, interval = delayInterval.default } = additionalConfig;
    const loadMoreDelay = (index % (limit + 1)) + 1;
    const delay = limit ? loadMoreDelay * interval : index * interval;

    return {
        ...flyDirections[direction],
        delay,
        ...config,
    };
}
