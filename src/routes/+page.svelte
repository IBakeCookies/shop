<script>
    import { pageStore } from '@store/pageStore.svelte';
    import Button from '@atom/button/button.svelte';
    import { fly } from 'svelte/transition';
    import { getFly } from '@presentation/utils/fly';
</script>

<section
    in:fly={getFly()}
    class="relative flex items-end"
    style="margin-top: -{pageStore.navHeight}px; min-height: calc(100vh - {pageStore.alertHeight}px)"
>
    <img
        src="/index.webp"
        alt="Revar Alpha Clothing"
        class="absolute top-0 left-0 h-full w-full object-cover"
    />

    <div class="relative mx-auto w-full max-w-screen-2xl px-8 py-24">
        <h1 class="text-5xl font-bold tracking-wide text-white capitalize">
            Gear up for adventure
        </h1>

        <Button modifier="mt-8" href="/products" variant="secondary">
            Show products
        </Button>
    </div>
</section>

<section class="mx-auto max-w-screen-2xl px-8 py-24">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
</section>

<section class="relative flex items-end text-white">
    <img
        src="/index-1.webp"
        alt="Revar Alpha Clothing"
        class="absolute top-0 left-0 h-full w-full object-cover"
    />

    <div class="relative mx-auto w-full max-w-screen-2xl px-8 py-24">
        <h1 class="mt-auto max-w-200 text-xl font-bold">
            Welcome to the REVAR Performance Journal—your gateway to the cutting
            edge of performance innovation. Dive in for expert insights,
            breakthrough technologies, and the future of performance apparel.
        </h1>
    </div>
</section>
