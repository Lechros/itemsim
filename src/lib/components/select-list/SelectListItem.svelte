<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle';
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { SelectListContextType } from './types';

	let {
		value,
		selected = $bindable(false),
		onSelect,
		onDeselect,
		children,
		class: className
	}: {
		value: string;
		selected?: boolean;
		onSelect?: () => void;
		onDeselect?: () => void;
		children?: Snippet;
		class?: string;
	} = $props();

	const { toggle, isSelected } = getContext<SelectListContextType>('SelectList');

	$effect(() => {
		selected = isSelected(value);
	});
</script>

<Toggle
	class={cn('h-12 w-full justify-start', className)}
	bind:pressed={() => isSelected(value), () => toggle(value)}
	onPressedChange={(v) => (v ? onSelect?.() : onDeselect?.())}
>
	{@render children?.()}
	{#if isSelected(value)}
		<div class="ml-auto p-2">
			<Check />
		</div>
	{/if}
</Toggle>
