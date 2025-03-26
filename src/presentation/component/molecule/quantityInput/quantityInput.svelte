<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    // import type { HTMLInputAttributes } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import Button from '@atom/button/button.svelte';
    import Input from '@atom/input/input.svelte';

    type Props = {
        name: string;
        value: number;
        min: number;
        max: number;
        variant?: 'default';
        class?: ClassValue;
        onChange: (newQuantiy: number) => void;
        children?: Snippet;
    };

    // & HTMLInputAttributes

    let {
        name,
        value = $bindable(),
        variant = 'default',
        min,
        max,
        onChange,
        children,
        ...props
    }: Props = $props();

    function increment(): void {
        if (value === max) {
            return;
        }

        value++;

        onChange(value);
    }

    function decrement(): void {
        if (value === min) {
            return;
        }

        value--;

        onChange(value);
    }

    function handleValue() {
        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }

        onChange(value);
    }
</script>

<div {...props} class={cn('flex max-w-36 items-center', props.class)}>
    <Button
        variant="neutral-light-outline"
        size="small"
        onclick={decrement}
        disabled={value === min}
    >
        -
    </Button>

    <Input disabled bind:value {name} type="number" {min} {max} oninput={handleValue} />

    <Button
        variant="neutral-light-outline"
        size="small"
        onclick={increment}
        disabled={value === max}
    >
        +
    </Button>
</div>
