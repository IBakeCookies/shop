<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Nav from '@organism/nav/nav.svelte';
	import Footer from '@organism/footer/footer.svelte';
	// 	import { useEventStore } from '@store/evenStore.svelte';

	// const eventStore = useEventStore();

	// eventStore.add('A');

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col">
		<Nav></Nav>
		
		<div class="mx-auto w-full max-w-[120rem] flex-1">
			{@render children()}
		</div>
		
		<Footer></Footer>
	</div>
</ParaglideJS>

