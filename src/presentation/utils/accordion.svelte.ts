type IsOpen = boolean;

interface UseAccordionInput<O = unknown> {
    isOpen?: IsOpen;
    value?: O;
}

interface UseAccordionOutput {
    isOpen: IsOpen;
    value: UseAccordionInput['value'];
    toggleAccordion: () => void;
    openAccordion: () => void;
    closeAccordion: () => void;
    // state: {
    //     isOpen: IsOpen;
    //     value: UseAccordionInput['value'];
    // };
}

export function useAccordion(config?: UseAccordionInput): UseAccordionOutput {
    const { value, isOpen = false } = config || {};
    // const state = $state({
    //     isOpen,
    //     value,
    // });
    let isOpenLocal = $state(isOpen);

    function toggleAccordion() {
        isOpenLocal = !isOpenLocal;
    }

    function openAccordion() {
        isOpenLocal = true;
    }

    function closeAccordion() {
        isOpenLocal = false;
    }

    return {
        // get state() {
        //     return state;
        // },
        get isOpen() {
            return isOpenLocal;
        },
        get value() {
            return value;
        },
        toggleAccordion,
        openAccordion,
        closeAccordion,
    };
}
