interface UseAccordionInput {
    isOpen?: boolean;
}

interface UseAccordionOutput {
    isOpen: boolean;
    value: string | number;
    toggleAccordion: () => void;
}

export function useAccordion(config?: UseAccordionInput): UseAccordionOutput {
    const { isOpen = false } = config || {};
    let isOpenLocal = $state(isOpen);
    const value = $state('');

    function toggleAccordion() {
        isOpenLocal = !isOpenLocal;
    }

    return {
        get isOpen() {
            return isOpenLocal;
        },
        get value() {
            return value;
        },
        toggleAccordion,
    };
}
