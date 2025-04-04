<script lang="ts">
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import Button from '@atom/button/button.svelte';
    import Input from '@atom/input/input.svelte';
    import Label from '@atom/label/label.svelte';

    interface Props {
        image: {
            src: string;
            alt: string;
        };
        class?: ClassValue;
    }

    const { image, ...props }: Props = $props();
</script>


{#snippet text()}
    Email
{/snippet}


<div
    {...props}
    class={cn(
        'newsltter grid grid-cols-1 items-center bg-stone-900 text-stone-100 lg:grid-cols-2',
        props.class,
    )}
>
    <img {...image} class="h-full object-cover" loading="lazy" />

    <div class="px-box py-20">
        <div>
            <h2 class="text-5xl tracking-wide text-white">No bullshit zone.</h2>

            <p class="mt-2 text-lg text-stone-400">
                We will not spam you inbox. Get only updates about new product.
            </p>

            <form class="mt-8">
                <Label {text} isRequired>
                    <Input
                        name="email"
                        type="email"
                        placeholder="john.doe@gmail.com"
                        required
                        class="block w-full"
                    />
                </Label>
               
                <Button type="submit" class="mt-4" variant="neutral-light-base">Subscribe</Button>
            </form>
        </div>
    </div>
</div>
