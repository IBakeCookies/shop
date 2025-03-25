<script lang="ts">
    import { getNumberAsLocaleString } from '@business/utils/number';

    interface Props {
        value: number | string;
        precision?: number;
        locale?: string;
    }

    const { value, precision = 0, locale = 'de-DE' }: Props = $props();
</script>

{getNumberAsLocaleString(value, {
    precision,
    locale,
})}
