<script lang="ts">
	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';
	import { cn } from '@presentation/utils/style';
	import Icon from '@iconify/svelte';

	interface Props {
		iconL?: string;
		iconR?: string;
		events?: string[];
		children: Snippet<[]>;
		variant?: 'primary' | 'secondary';
		isLoading?: boolean;
	}

	const {
		iconL,
		iconR,
		events,
		isLoading,
		children,
		variant = 'primary',
		...restProps
	}: Props = $props();

	const currentVariant: string = $derived.by(() => {
		if (variant === 'primary') {
			return 'bg-stone-900 text-stone-100 hover:bg-stone-700 transition-colors';
		}

		if (variant === 'secondary') {
			return 'border-2 bg-stone-100 border-stone-900 text-stone-90 hover:bg-stone-200   transition-colors';
		}

		return '';
	});
</script>

<button
	{...restProps}
	class={cn(
		'a-button flex cursor-pointer items-center justify-center rounded px-8 py-3 disabled:bg-zinc-500',
		currentVariant,
		restProps.class,
		{
			'cursor-not-allowed': isLoading
		}
	)}
	disabled={isLoading}
>
	{#if iconL}
		<Icon icon={iconL} class="mr-4 h-6 w-6" />
	{/if}

	{@render children()}

	{#if iconR}
		<Icon icon={iconR} class="ml-4 h-6 w-6" />
	{/if}

	{#if isLoading}
		<Icon icon="bi:arrow-repeat" class="ml-4 h-6 w-6 animate-spin" />
	{/if}
</button>
