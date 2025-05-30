<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';
	import { type Gear, type Scroll } from '@malib/gear';
	import { getEtcScrolls } from '../model/etcScroll';
	import type { SelectScrollFunction } from '../model/types';

	let {
		gear,
		selectedScroll,
		selectScroll
	}: {
		gear: Gear;
		selectedScroll: Scroll | null;
		selectScroll: SelectScrollFunction;
	} = $props();

	let scrolls = $derived(getEtcScrolls(gear));
</script>

<SelectList value={selectedScroll?.name} size={6} allowSingleDeselect={false}>
	{#each scrolls as scroll (scroll.name)}
		<SelectListItem value={scroll.name} onSelect={() => selectScroll(scroll)}>
			<ItemRawIcon icon={scroll.icon!} />
			{scroll.name}
		</SelectListItem>
	{/each}
</SelectList>
