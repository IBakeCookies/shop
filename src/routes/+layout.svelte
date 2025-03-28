<script lang="ts">
    import type { Component } from 'svelte';
    import '@src/app.css';
    import Icon from '@iconify/svelte';
    import { ParaglideJS } from '@inlang/paraglide-sveltekit';
    import { i18n } from '$lib/i18n';
    import { onMount } from 'svelte';
    import { fly, slide } from 'svelte/transition';
    import { CartStore, setCartStore } from '@store/cartStore.svelte';
    import { setEventStore } from '@store/eventStore.svelte';
    import { setNotificationStore } from '@store/notificationStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { cartLocalStorage } from '@storage/cartStorage';
    import { getFly } from '@presentation/utils/fly';
    import Footer from '@organism/footer/footer.svelte';
    import Nav from '@organism/nav/nav.svelte';
    import Newsletter from '@molecule/newsletter/newsletter.svelte';
    import Alert from '@atom/alert/alert.svelte';

    const { children } = $props();
    const notificationStore = setNotificationStore();
    const eventStore = setEventStore();
    const cartStore = setCartStore(
        new CartStore({
            storage: cartLocalStorage,
            notificationStore,
            eventStore,
        }),
    );

    let navRef: null | HTMLDivElement = $state(null);
    let alertRef: null | HTMLDivElement = $state(null);
    let DynamicNotification: Component | undefined = $state();

    $effect(() => {
        if (!notificationStore.notifications.length) {
            return;
        }

        import('@atom/notification/notification.svelte').then((module) => {
            DynamicNotification = module.default;
        });
    });

    $effect(() => {
        pageStore.navHeight = navRef.scrollHeight || 0;
        pageStore.alertHeight = alertRef.scrollHeight || 0;
    });

    eventStore.addEvent('cartStore.hydration');

    onMount(() => {
        cartStore.hydrateFromStorage();
        eventStore.removeEvent('cartStore.hydration');
    });
</script>

<ParaglideJS {i18n}>
    <Alert bind:ref={alertRef} variant="neutral-dark-base" class="text-center">
        Free shipping on orders over €200 within Germany
    </Alert>

    {#if DynamicNotification}
        <div class="px-box fixed top-40 left-1/2 z-(--z-notification) w-full -translate-x-1/2">
            <div class="mx-auto flex max-w-screen-2xl flex-col items-end">
                {#each notificationStore.notifications as notification (notification.id)}
                    <div transition:fly|global={getFly('fromTop')} class="max-w-notification">
                        <div transition:slide|global class="mb-6">
                            <DynamicNotification
                                {notification}
                                dismiss={(id) => notificationStore.removeNotification(id)}
                            />
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div
        bind:this={navRef}
        class="p-box sticky top-0 z-(--z-nav) border-b border-stone-200 bg-white"
    >
        <Nav
            items={[
                {
                    title: 'Home',
                    href: '/',
                },
                {
                    title: 'Products',
                    href: '/products',
                },
            ]}
            cartItemsCount={cartStore.totalItemsCount}
            class="mx-auto max-w-screen-2xl"
        >
            REVAR
        </Nav>
    </div>

    <div class="flex w-full flex-1 flex-col">
        {@render children()}
    </div>

    <div class="px-box border-y border-stone-200 bg-white">
        <div class="mx-auto grid max-w-screen-2xl grid-cols-3">
            <div class="p-box flex flex-col items-center justify-center border-x border-stone-200">
                <Icon icon="mdi:truck-fast" class="text-3xl text-emerald-600" />

                <h4 class="mt-4 text-xl">Quick shipping</h4>
            </div>

            <div class="p-box flex flex-col items-center justify-center border-stone-200">
                <Icon icon="mdi:encryption-secure" class="text-3xl text-emerald-600" />

                <h4 class="mt-4 text-xl">Secure transactions</h4>
            </div>

            <div class="p-box flex flex-col items-center justify-center border-x border-stone-200">
                <Icon icon="mdi:freehand-line" class="text-3xl text-emerald-600" />

                <h4 class="mt-4 text-xl">Handmade goods</h4>
            </div>
        </div>
    </div>

    <Newsletter
        image={{
            src: 'https://file.garden/Z-Ko2HO6YkiJFqy0/revar/main/uTPut4rjAjrbTKFw2nWAatJXdcN9mU2s.webp',
            alt: 'snow',
        }}
    />

    <Footer />
</ParaglideJS>
