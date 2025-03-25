<script lang="ts">
    import Icon from '@iconify/svelte';
    import { getEventStore } from '@store/eventStore.svelte';
	import type { ClassValue } from 'svelte/elements';

    interface Props {
        auto?: boolean;
        events?: string[];
        isRelative?: boolean;
        class?: ClassValue;
    }

    let { auto, events = [], isRelative, ...props }: Props = $props();

    const eventStore = getEventStore();
    const isLoading = $derived<boolean>(eventStore && eventStore.hasAny(events));
    const loaderClasses =
        'p-box pointer-events-none flex items-center justify-center';
    const additionalClasses = isRelative ? 'relative' : 'absolute w-full h-full top-0 left-0';
</script>

{#if isLoading || (auto && !events.length)}
    <div {...props} class={[loaderClasses, additionalClasses, props.class]}>
        <Icon class="min-h-6 min-w-6 animate-spin" icon="mdi:gamepad-circle-outline" />
    </div>
{/if}
