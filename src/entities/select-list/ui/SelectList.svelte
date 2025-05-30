<script lang="ts">
	import type { SelectListContextType } from '$lib/entities/select-list/model/types';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { setContext, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		yCount = 6,
		multiple = false,
		value = $bindable(null),
		values = $bindable([]),
		children
	}: {
		yCount?: number;
		multiple?: boolean;
		value?: string | null;
		values?: string[];
		children?: Snippet;
	} = $props();

	const wrapperHeight = $derived(yCount * 48);

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
				value = null;
			} else {
				value = v;
			}
		}
	}
</script>

<ScrollArea style="height: {wrapperHeight}px">
	<div class="flex flex-col">
		{@render children?.()}
	</div>
</ScrollArea>
