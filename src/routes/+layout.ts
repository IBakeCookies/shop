import type { LayoutLoad } from './$types';
import { loadIcon } from '@iconify/svelte';

const iconNames = ['mdi:gamepad-circle-outline', 'mdi:cart'];

export const load: LayoutLoad = async () => {
    iconNames.forEach((iconName) => {
        loadIcon(iconName);
    });
};
