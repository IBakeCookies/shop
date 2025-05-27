import type { LayoutLoad } from './$types';
import { loadIcon } from '@iconify/svelte';

const iconNames = ['mdi:gamepad-circle-outline', 'mdi:cart'];

export const load: LayoutLoad = ({ data }) => {
    iconNames.forEach((iconName) => {
        loadIcon(iconName);
    });

    return {
        ...data,
    };
};
