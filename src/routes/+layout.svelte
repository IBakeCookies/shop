<script lang="ts">
    import '@src/app.css';
    import { i18n } from '$lib/i18n';
    import { ParaglideJS } from '@inlang/paraglide-sveltekit';
    import { pageStore } from '@store/pageStore.svelte';
    import { setNotificationStore } from '@store/notificationStore.svelte';
    import { setEventStore } from '@store/eventStore.svelte';
    import { setCartStore } from '@store/cartStore.svelte';
    import Nav from '@organism/nav/nav.svelte';
    import Footer from '@organism/footer/footer.svelte';
    import NotificationList from '@molecule/notificationList/notificationList.svelte';
    import Newsletter from '@atom/newsletter/newsletter.svelte';
    import Alert from '@atom/alert/alert.svelte';
    import { onMount } from 'svelte';

    setNotificationStore();
    setEventStore();

    const cartStore = setCartStore();
    const { children } = $props();

    let navRef: null | HTMLDivElement = $state(null);
    let alertRef: null | HTMLDivElement = $state(null);

    $effect(() => {
        pageStore.navHeight = navRef?.scrollHeight || 0;
        pageStore.alertHeight = alertRef?.scrollHeight || 0;
    });

    onMount(() => {
        cartStore.hydrateFromStorage();
    });
</script>

<ParaglideJS {i18n}>
    <Alert bind:ref={alertRef} type="state-dark" modifier="text-center">
        Free shipping on orders over €200
    </Alert>

    <div
        class="notifications fixed top-40 right-0 z-101 flex flex-col items-center px-8"
    >
        <NotificationList />
    </div>

    <Nav bind:ref={navRef} />

    <div class="flex w-full flex-1 flex-col">
        {@render children()}
    </div>

    <Newsletter />

    <Footer />
</ParaglideJS>
