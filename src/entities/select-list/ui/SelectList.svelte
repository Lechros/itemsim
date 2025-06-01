<script lang="ts" generics="T">
	import type { SelectListContextType } from '$lib/entities/select-list/model/types';
	import { VirtualList } from '$lib/shared/ui/virtual-list';
	import { setContext, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		items,
		size,
		multiple = false,
		allowSingleDeselect = true,
		value = $bindable(null),
		values = $bindable(new SvelteSet<string>()),
		renderItem
	}: {
		items: T[] | readonly T[];
		size?: number;
		multiple?: boolean;
		allowSingleDeselect?: boolean;
		value?: string | null;
		values?: Set<string>;
		renderItem: Snippet<[item: T, index: number]>;
	} = $props();

	const wrapperStyle = $derived(size ? `height: ${size * 48}px` : undefined);

	setContext<SelectListContextType>('SelectList', { toggle, isSelected });

	function isSelected(v: string) {
		if (multiple) {
			return values.has(v);
		} else {
			return value === v;
		}
	}

	function toggle(v: string) {
		if (multiple) {
			if (isSelected(v)) {
				values.delete(v);
			} else {
				values.add(v);
			}
		} else {
			if (isSelected(v)) {
				if (allowSingleDeselect) {
					value = null;
				}
			} else {
				value = v;
			}
		}
	}
</script>

<VirtualList
	containerStyle={wrapperStyle}
	{items}
	{renderItem}
	defaultEstimatedItemHeight={48}
	bufferSize={size}
/>
