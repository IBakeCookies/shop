<script>
    import { fly } from 'svelte/transition';
    import { pageStore } from '@store/pageStore.svelte';
    import { getFly } from '@presentation/utils/fly';
    import Button from '@atom/button/button.svelte';
</script>

<!-- style="margin-top: -{pageStore.navHeight}px; min-height: calc(100vh - {pageStore.alertHeight}px)"> -->

<section
    in:fly={getFly()}
    class="relative flex items-end"
    style={`min-height: calc(100vh - (${pageStore.alertHeight}px + ${pageStore.navHeight}px))`}
>
    <img
        src="https://file.garden/Z-Ko2HO6YkiJFqy0/revar/main/8XRbuWcqw2fiQM6RRQT9233g4hhjcFiu.webp"
        alt="Revar Alpha Clothing"
        class="absolute top-0 left-0 h-full w-full object-cover"
    />

    <div class="px-box relative mx-auto w-full max-w-screen-2xl py-24">
        <h1 class="text-5xl tracking-wide text-white capitalize">Gear up for adventure</h1>

        <Button class="mt-8" href="/products" variant="neutral-light-base">Show products</Button>
    </div>
</section>

<section class="px-box mx-auto max-w-screen-2xl py-24">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
    ipsum dolor sit amet.
</section>

<section class="relative flex items-end text-white">
    <img
        src="https://file.garden/Z-Ko2HO6YkiJFqy0/revar/main/AktscDT7ZBiJHLKb6E5kxjoTBY3jTkrD.webp"
        alt="Revar Alpha Clothing"
        class="absolute top-0 left-0 h-full w-full object-cover"
    />

    <div class="px-box relative mx-auto w-full max-w-screen-2xl py-24">
        <h1 class="mt-auto max-w-200 text-xl">
            Welcome to the REVAR Performance Journal—your gateway to the cutting edge of performance
            innovation. Dive in for expert insights, breakthrough technologies, and the future of
            performance apparel.
        </h1>
    </div>
</section>
