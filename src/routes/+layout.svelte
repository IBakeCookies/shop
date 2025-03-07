<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Alert from '@atom/alert/alert.svelte';
	import Nav from '@organism/nav/nav.svelte';
	import Footer from '@organism/footer/footer.svelte';
	// 	import { useEventStore } from '@store/evenStore.svelte';

	// const eventStore = useEventStore();

	// eventStore.add('A');

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col bg-white text-stone-900">
		<!-- <Alert type="state"> 
			This website is still in development. You might encounter bugs, page crashes, etc...
		</Alert> -->

		<Nav></Nav>

		<main class="flex w-full flex-1 flex-col">
			{@render children()}
		</main>

		<Footer></Footer>
	</div>
</ParaglideJS>
