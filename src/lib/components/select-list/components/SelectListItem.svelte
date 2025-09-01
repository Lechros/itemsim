<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle';
	import { Check } from 'lucide-svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { SelectListContextType } from '../types';

	let {
		value,
		selected = $bindable(false),
		onSelect,
		onDeselect,
		children
	}: {
		value: string;
		selected?: boolean;
		onSelect?: () => void;
		onDeselect?: () => void;
		children?: Snippet;
	} = $props();

	const { toggle, isSelected } = getContext<SelectListContextType>('SelectList');

	$effect(() => {
		selected = isSelected(value);
	});
</script>

<Toggle
	class="h-12 w-full justify-start"
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
