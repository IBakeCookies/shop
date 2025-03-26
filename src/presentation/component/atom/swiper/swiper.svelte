<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import type { SwiperContainer } from 'swiper/element/bundle';
    // import type { Swiper } from 'swiper';
    import type { SwiperOptions } from 'swiper/types';
    import { register } from 'swiper/element/bundle';

    interface Props extends SwiperOptions {
        container: SwiperContainer | undefined;
        children?: Snippet;
        class?: ClassValue;
    }

    let { container = $bindable(), children, ...props }: Props = $props();

    // let instance: Swiper | undefined = $state();

    register();
</script>

<swiper-container class={['swiper', props.class]} {...props} bind:this={container} loop>
    {@render children?.()}
</swiper-container>