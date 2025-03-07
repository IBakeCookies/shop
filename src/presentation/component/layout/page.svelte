<script lang="ts">
	import type { ClassValue } from 'clsx';
    import type { Snippet } from 'svelte';
	import { cn } from '@presentation/utils/style';

	type Props = {
		modifier?: ClassValue;
		children: Snippet;
	};

	const {
		modifier,
		children,
		...restProps
	}: Props = $props();
</script>

<section {...restProps} class={cn('relative flex flex-1 items-center justify-center text-stone-100', modifier)}>
	<div class="header-img absolute top-0 left-0 h-full w-full bg-cover"></div>
	
	<span class="absolute top-0 left-0 h-full w-full bg-black/60"></span>

	<div class="relative flex flex-col items-center justify-center mx-auto max-w-[120rem]">
        {@render children()}
	</div>
</section>
