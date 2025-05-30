<script lang="ts">
	import type { SelectListContextType } from '$lib/entities/select-list/model/types';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { setContext, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		size,
		multiple = false,
		allowSingleDeselect = true,
		value = $bindable(null),
		values = $bindable([]),
		children
	}: {
		size?: number;
		multiple?: boolean;
		allowSingleDeselect?: boolean;
		value?: string | null;
		values?: string[];
		children?: Snippet;
	} = $props();

	const wrapperStyle = $derived(size ? `height: ${size * 48}px` : undefined);

	const selected = $state(new SvelteSet<string>());

	setContext<SelectListContextType>('SelectList', { toggle, isSelected });

	function isSelected(v: string) {
		if (multiple) {
			return selected.has(v);
		} else {
			return value === v;
		}
	}

	function toggle(v: string) {
		if (multiple) {
			if (isSelected(v)) {
				selected.delete(v);
				values.splice(values.indexOf(v), 1);
			} else {
				selected.add(v);
				values.push(v);
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

<ScrollArea style={wrapperStyle}>
	<div class="flex flex-col">
		{@render children?.()}
	</div>
</ScrollArea>
