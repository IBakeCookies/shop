<!-- <script lang="ts">
	import { eventStore } from '@store/event';
	import Icon from '@atom/icon.svelte';

	export let auto = true;
	export let events: string = '';
	export let relative = false;

	$: isLoading = $eventStore && eventStore.hasAny(events);

	const loaderClasses =
		'p-box pointer-events-none text-primary z-loader flex items-center justify-center';
	const additionalClasses = relative ? 'relative' : 'absolute w-full h-full top-0 left-0';
</script>

{#if isLoading || (auto && !events)}
	<div class="{loaderClasses} {additionalClasses} {$$props.class || ''}">
		<Icon class="animate-spin icon-l" icon="loader" />
	</div>
{/if} -->
