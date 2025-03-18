<script lang="ts">
    import type { ClassValue } from 'clsx';

    let {
        icon,
        style,
    }: {
        icon: string;
        style?: ClassValue;
    } = $props();
</script>

<svg class="icon {style}">
    <use xlink:href="#{icon}" />
</svg>
