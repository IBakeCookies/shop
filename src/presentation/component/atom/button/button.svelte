<script lang="ts">
	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '@presentation/utils/style';
	import Icon from '@iconify/svelte';

	type Props = {
		href?: string;
		iconL?: string;
		iconR?: string;
		events?: string[];
		isLoading?: boolean;
		variant?: 'primary' | 'secondary';
		disabled?: boolean;
		modifier?: ClassValue;
		children: Snippet;
	} & (HTMLAnchorAttributes | HTMLButtonAttributes);

	const {
		href,
		iconL,
		iconR,
		events,
		isLoading,
		variant = 'primary',
		disabled,
		modifier,
		children,
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

<svelte:element
	{...restProps}
	this={href ? 'a' : 'button'}
	class={cn(
		'a-button flex cursor-pointer items-center justify-center rounded px-8 py-3 disabled:bg-zinc-500',
		currentVariant,
		modifier,
		{
			'cursor-not-allowed': isLoading || disabled
		}
	)}
	disabled={isLoading || disabled}
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
</svelte:element>
