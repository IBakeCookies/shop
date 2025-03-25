<script lang="ts">
    import type { ClassValue } from 'svelte/elements';
    import { cn } from '@presentation/utils/style';
    import Number from '@atom/number/number.svelte';

    interface Props {
        value: number | string;
        locale?: string;
        precision?: number;
        currency?: string;
        withCurrency?: boolean;
        class?: ClassValue;
    }

    const {
        value,
        precision = 0,
        currency = '€',
        locale = 'de-DE',
        withCurrency = true,
        ...props
    }: Props = $props();
</script>

<money {...props} class={cn('', props.class)}>
    {#if withCurrency}
        {currency}
    {/if}<Number {value} {precision} {locale} />
</money>
