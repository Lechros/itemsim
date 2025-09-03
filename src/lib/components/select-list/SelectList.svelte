<script lang="ts" generics="T">
	import { type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { SelectListVirtualizer } from '$lib/components/select-list/index';

	let {
		items,
		children,
		getKey,
		size,
		multiple = false,
		selected = $bindable(null),
		selectedSet = $bindable(new SvelteSet<string>()),
		allowDeselect = true
	}: {
		items: T[];
		children: Snippet<[item: T, index: number]>;
		getKey?: (item: T) => string;
		size?: number;
		multiple?: boolean;
		selected?: string | null;
		selectedSet?: Set<string>;
		allowDeselect?: boolean;
	} = $props();

	const wrapperStyle = $derived(size ? `height: ${size * 48}px` : undefined);

	let viewportRef: HTMLElement | null = $state(null);
</script>

<ScrollArea bind:viewportRef style={wrapperStyle}>
	{#if viewportRef}
		<SelectListVirtualizer
			{items}
			{children}
			{getKey}
			scrollRef={viewportRef}
			{multiple}
			{selected}
			{selectedSet}
			{allowDeselect}
		/>
	{/if}
</ScrollArea>
