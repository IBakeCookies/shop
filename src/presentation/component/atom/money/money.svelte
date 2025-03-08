<script lang="ts">
    import type { ClassValue } from 'clsx';
    import { cn } from '@presentation/utils/style';

    interface Props {
        value: number | string;
        locale?: string;
        precision?: number;
        currency?: string;
        withCurrency?: boolean;
        modifier?: ClassValue;
    }

    const {
        value,
        modifier,
        precision = 0,
        currency = '€',
        locale = 'de-DE',
        withCurrency = true,
        ...restProps
    }: Props = $props();

    function isNumber(item: unknown): item is number {
        return typeof item === 'number' && !Number.isNaN(item);
    }

    const valueAsNumber: number = $derived.by(() => {
        if (isNumber(value)) {
            return value;
        }

        return parseFloat(value);
    });

    const money = $derived.by(() => {
        return new Intl.NumberFormat(locale, {
            maximumFractionDigits: precision,
            minimumFractionDigits: precision,
        }).format(valueAsNumber);
    });
</script>

<money {...restProps} class={cn('a-money', modifier)}>
    {#if withCurrency}
        {currency}&nbsp;
    {/if}{money}
</money>
