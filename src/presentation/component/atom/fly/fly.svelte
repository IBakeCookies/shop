<script lang="ts">
    import type { AdditionalConfig, Direction } from '@presentation/utils/fly';
    import type { Snippet } from 'svelte';
    import type { ClassValue } from 'svelte/elements';
    import { fly } from 'svelte/transition';
    import { getFly } from '@presentation/utils/fly';

    interface Props {
        type?: 'in' | 'out' | 'inOut';
        direction?: Direction;
        index?: AdditionalConfig['index'];
        limit?: AdditionalConfig['limit'];
        class?: ClassValue;
        children: Snippet;
    }

    const {
        type = 'in',
        direction = 'fromBottom',
        index = 0,
        limit = 0,
        children,
        ...props
    }: Props = $props();

    const transition = $derived.by(() => {
        if (type === 'in') {
            return {
                flyIn: getFly(
                    direction,
                    {},
                    {
                        index,
                        limit,
                    },
                ),
                flyOut: {
                    duration: 0,
                },
            };
        }

        if (type === 'out') {
            return {
                flyIn: {
                    duration: 0,
                },
                flyOut: getFly(
                    direction,
                    {},
                    {
                        index,
                        limit,
                    },
                ),
            };
        }

        return {
            flyIn: getFly(
                direction,
                {},
                {
                    index,
                    limit,
                },
            ),
            flyOut: getFly(
                direction,
                {},
                {
                    index,
                    limit,
                },
            ),
        };
    });
</script>

<div {...props} class={['fly', props.class]} in:fly={transition.flyIn} out:fly={transition.flyOut}>
    {@render children()}
</div>
