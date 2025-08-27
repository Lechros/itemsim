<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
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

	let scrolls: Scroll[] = $derived(getEtcScrolls(gear));
</script>

<SelectList selected={selectedScroll?.name} size={6} allowDeselect={false} items={scrolls}>
	{#snippet children(scroll)}
		<SelectListItem value={scroll.name} onSelect={() => selectScroll(scroll)}>
			<ItemRawIcon icon={scroll.icon!} />
			{scroll.name}
		</SelectListItem>
	{/snippet}
</SelectList>
