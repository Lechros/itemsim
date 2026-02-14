<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip';
	import { GearTooltip as GearTooltip2 } from '$lib/components/gear-tooltip2';
	import type { ReadonlyGear } from '@malib/gear';
	import { createExclusiveEquipsLoader, useExclusiveEquips } from './exclusive-equip';
	import { createSetItemNameLoader, useSetItems } from './set-item';

	type Tooltip1Props = {
		cannot?: {
			level?: boolean;
			job?: boolean;
			gender?: boolean;
		};
		incline: { combat: number } | { attack: number } | { attack: number; combat: number };
	};
	type Tooltip2Props = {
		cannot?: {
			level?: boolean;
			job?: boolean;
			gender?: boolean;
		};
		incline: { equipped: true } | { combat: number };
		expand?: boolean;
	};

	let {
		gear,
		tooltipVersion = '2',
		...props
	}: { gear: ReadonlyGear; tooltipVersion: '1' | '2' } & (Tooltip1Props | Tooltip2Props) = $props();

	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();

	const loadSetItemName = $derived(createSetItemNameLoader(setItems.data));
	const loadExclusiveEquips = $derived(createExclusiveEquipsLoader(exclusiveEquips.data));
</script>

{#if tooltipVersion === '1'}
	<GearTooltip {gear} {loadExclusiveEquips} {...props as Tooltip1Props} />
{:else if tooltipVersion === '2'}
	<GearTooltip2 {gear} {loadSetItemName} {loadExclusiveEquips} {...props as Tooltip2Props} />
{/if}
