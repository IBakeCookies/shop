import type { LayoutLoad } from './$types';
import { loadIcon } from '@iconify/svelte';

const iconName = 'mdi:gamepad-circle-outline';

export const load: LayoutLoad = async () => {
    loadIcon(iconName);
};
