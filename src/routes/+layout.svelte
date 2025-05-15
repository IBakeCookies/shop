<script lang="ts">
    import type { LayoutProps } from './$types';
    import '@src/app.css';
    import Icon from '@iconify/svelte';
    import { scrollY } from 'svelte/reactivity/window';
    import { fly, slide } from 'svelte/transition';
    import { CartStore, setCartStore } from '@store/cartStore.svelte';
    import { setEventStore } from '@store/eventStore.svelte';
    import { setNotificationStore } from '@store/notificationStore.svelte';
    import { pageStore } from '@store/pageStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import Footer from '@organism/footer/footer.svelte';
    import Nav from '@organism/nav/nav.svelte';
    import Newsletter from '@molecule/newsletter/newsletter.svelte';
    import Alert from '@atom/alert/alert.svelte';

    const { data, children }: LayoutProps = $props();
    const notificationStore = setNotificationStore();
    const eventStore = setEventStore();
    const cartStore = setCartStore();

    let navRef: null | HTMLDivElement = $state(null);
    let alertRef: null | HTMLDivElement = $state(null);
    
    if (data.notifications) {
        data.notifications.forEach(({ message, variant }) => {
            notificationStore.addNotification({
                title: message,
                variant: variant,
                fade: false,
            });
        });
    }

    $effect(() => {
        pageStore.navHeight = navRef?.scrollHeight || 0;
        pageStore.alertHeight = alertRef?.scrollHeight || 0;
    });

    $effect(() => {
        cartStore.hydrateStore(data.cartItems || []);
    });
    // Revar Alpha Pants 60 price_1R8MedBC9hnWQxBpA8aj1FCI
</script>


<Alert bind:ref={alertRef} variant="neutral-dark-base" class="text-center">
    Free shipping on orders over €200 within Germany
</Alert>

{#if notificationStore.notifications.length}
    {#await import('@atom/notification/notification.svelte') then { default: Notification }}
        <div class="px-box fixed top-40 left-1/2 z-(--z-notification) w-full -translate-x-1/2">
            <div class="mx-auto flex max-w-screen-2xl flex-col items-end">
                {#each notificationStore.notifications as notification (notification.id)}
                    <div transition:fly|global={getFly('fromTop')} class="max-w-notification">
                        <div transition:slide|global class="mb-6">
                            <Notification
                                {notification}
                                dismiss={(id) => notificationStore.removeNotification(id)}
                            />
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/await}
{/if}

<div
    bind:this={navRef}
    class={[
        'p-box sticky top-0 z-(--z-nav) border-b border-stone-200 bg-white transition-all',
        {
            'py-4': Number(scrollY.current) > 0,
        },
    ]}
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
        totalPrice={cartStore.totalPrice}
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

<style>
    @font-face {
        font-family: 'IBM Plex Sans', sans-serif;
        src: url('font/IBM_Plex_Sans/IBMPlexSans-VariableFont_wdth,wght.ttf');
    }

    @font-face {
        font-family: 'Recursive', sans-serif;
        src: url('font/Recursive/Recursive-VariableFont_CASL,CRSV,MONO,slnt,wght.ttf');
    }

    .selector {
        transform: translateX(-100%);
        animation: tktk 0.5s ease-in-out;
    }
</style>
