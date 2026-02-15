<script lang="ts" generics="T">
	import { setContext, type Snippet } from 'svelte';
	import type { SelectListContextType } from './types';
	import { SvelteSet } from 'svelte/reactivity';
	import { Virtualizer } from 'virtua/svelte';

	let {
		items,
		children: childrenProp,
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
		scrollRef: HTMLElement;
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

	/**
	 * Virtua 0.48.5에서 getKey에 undefined가 전달되는 경우가 있어,
	 * 함수에 undefined가 전달될 경우 index로부터 임시 키를 반환하도록 한다.
	 */
	function createSafeGetKey<T>(
		getKey: (item: T) => string
	): (item: T | undefined, index: number) => string {
		return (item, index) => (item === undefined ? `__temp_${index}` : getKey(item));
	}

	const safeGetKey = $derived(getKey ? createSafeGetKey(getKey) : undefined);
</script>

<Virtualizer data={items} getKey={safeGetKey} {startMargin} {scrollRef}>
	{#snippet children(item, index)}
		{#if item}
			{@render childrenProp(item, index)}
		{/if}
	{/snippet}
</Virtualizer>
