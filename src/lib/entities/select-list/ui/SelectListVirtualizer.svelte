<script lang="ts" generics="T">
	import { Virtualizer } from '$lib/shared/ui/virtua-custom/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { SelectListContextType } from '../model/types';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		items,
		children,
		getKey,
		startMargin = 0,
		scrollRef,
		multiple = false,
		selected = $bindable(null),
		selectedSet = $bindable(new SvelteSet<string>()),
		allowDeselect = true
	}: {
		items: T[];
		children: Snippet<[item: T, index: number]>;
		getKey?: (item: T) => string;
		startMargin?: number;
		scrollRef: HTMLElement | null;
		multiple?: boolean;
		selected?: string | null;
		selectedSet?: Set<string>;
		allowDeselect?: boolean;
	} = $props();

	setContext<SelectListContextType>('SelectList', { toggle, isSelected });

	function isSelected(v: string) {
		if (multiple) {
			return selectedSet.has(v);
		} else {
			return selected === v;
		}
	}

	function toggle(v: string) {
		if (multiple) {
			if (isSelected(v)) {
				if (allowDeselect) {
					selectedSet.delete(v);
				}
			} else {
				selectedSet.add(v);
			}
		} else {
			if (isSelected(v)) {
				if (allowDeselect) {
					selected = null;
				}
			} else {
				selected = v;
			}
		}
	}
</script>

<Virtualizer data={items} {getKey} {startMargin} scrollRef={scrollRef ?? undefined} {children} />
