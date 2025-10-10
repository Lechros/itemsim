<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import type { ReadonlyGear } from '@malib/gear';
	import { createExclusiveEquipsLoader, useExclusiveEquips } from './exclusive-equip';
	import { createSetItemNameLoader, useSetItems } from './set-item';
	import type { ComponentProps } from 'svelte';

	let {
		gear,
		...props
	}: {
		gear: ReadonlyGear;
	} & Omit<ComponentProps<typeof GearTooltip>, 'loadSetItemName' | 'loadExclusiveEquips'> =
		$props();

	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();

	const loadSetItemName = $derived(createSetItemNameLoader(setItems.data));
	const loadExclusiveEquips = $derived(createExclusiveEquipsLoader(exclusiveEquips.data));
</script>

<GearTooltip {gear} {loadSetItemName} {loadExclusiveEquips} {...props} />
