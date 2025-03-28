export function isNumber(item: unknown): item is number {
    return typeof item === 'number' && !Number.isNaN(item);
}

export function getValueAsNumber(value: string | number): number {
    if (isNumber(value)) {
        return value;
    }

    return parseFloat(value);
}

interface LocaleNumberConfig {
    locale?: string;
    precision?: number;
}

export function getNumberAsLocaleString(
    value: string | number,
    config: LocaleNumberConfig = {},
): string {
    const valueAsNumber = getValueAsNumber(value);
    const { locale = 'de-DE', precision = 2 } = config;

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
    }).format(valueAsNumber);
}
