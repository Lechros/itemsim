<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';
	import { type Gear, type Scroll } from '@malib/gear';
	import { getSpellTraceScrolls } from '../model/spellTrace';
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

	let scrolls = $derived(getSpellTraceScrolls(gear));
</script>

<SelectList value={selectedScroll?.name} size={6} allowSingleDeselect={false} items={scrolls}>
	{#snippet renderItem(scroll)}
		<SelectListItem
			value={scroll.name}
			onSelect={() =>
				selectScroll(scroll, () => {
					gear.applySpellTrace(scroll.type, scroll.rate);
				})}
		>
			<ItemRawIcon icon={scroll.icon!} />
			{scroll.name}
		</SelectListItem>
	{/snippet}
</SelectList>
