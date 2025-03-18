<script lang="ts">
    import type { ClassValue } from 'clsx';
    import { cn } from '@presentation/utils/style';
    // import Button from '@atom/button/button.svelte';
    import Input from '@atom/input/input.svelte';

    interface Props {
        modifier?: ClassValue;
    }

    const { modifier, ...props }: Props = $props();
</script>

<div
    {...props}
    class={cn(
        'newsltter grid grid-cols-1 items-center bg-stone-900 text-stone-100 lg:grid-cols-2',
        modifier,
    )}
>
    <img src="/snow.webp" alt="snow" />

    <div class="px-8 py-20">
        <div>
            <h2 class="text-5xl font-bold tracking-wide text-white">
                No bullshit zone.
            </h2>

            <p class="mt-2 text-lg text-stone-400">
                We will not spam you inbox. Get only updates about new product.
            </p>

            <form>
                <Input required modifier="mt-8" type="number">Subscribe</Input>
            </form>
        </div>
    </div>
</div>
