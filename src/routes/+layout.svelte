<script lang="ts">
    import '@src/app.css';
    import { i18n } from '$lib/i18n';
    import { ParaglideJS } from '@inlang/paraglide-sveltekit';
    import { pageStore } from '@store/pageStore.svelte';
    import Alert from '@atom/alert/alert.svelte';
    import Nav from '@organism/nav/nav.svelte';
    import Footer from '@organism/footer/footer.svelte';
    // 	import { useEventStore } from '@store/evenStore.svelte';

    // const eventStore = useEventStore();

    // eventStore.add('A');

    let { children } = $props();

    let navRef: null | HTMLDivElement = $state(null);

    $effect(() => {
        if (!navRef) {
            return;
        }

        pageStore.navHeight = navRef.scrollHeight;
    });
</script>

<ParaglideJS {i18n}>
    <Alert type="state-dark" modifier="text-center">Free shipping on order over €200</Alert>

    <Nav bind:ref={navRef}></Nav>

    <div class="flex w-full flex-1 flex-col">
        {@render children()}
    </div>

    <Footer></Footer>
</ParaglideJS>
