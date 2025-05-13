<script lang="ts">
	import { getOptionStrings } from '$lib/entities/gear-tooltip2/model/option';
	import {
		ReadonlyGear,
		type GearAddOption,
		type GearBaseOption,
		type GearOption,
		type GearStarforceOption,
		type GearUpgradeOption
	} from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';
	import StatDetail from './StatDetail.svelte';

	let {
		gear,
		key,
		size = 'normal'
	}: {
		gear: ReadonlyGear;
		key: keyof GearOption;
		size?: 'normal' | 'large';
	} = $props();

	const base = $derived(gear.baseOption[key as keyof GearBaseOption]);
	const add = $derived(gear.addOption[key as keyof GearAddOption]);
	const upgrade = $derived(gear.upgradeOption[key as keyof GearUpgradeOption]);
	const starforce = $derived(gear.starforceOption[key as keyof GearStarforceOption]);
	const sum = $derived(base + add + upgrade + starforce);
	const [label, valueStr] = $derived(getOptionStrings(key, sum, true));
	const rate = $derived(valueStr.endsWith('%'));
</script>

{#if base > 0 || sum > 0}
	<div class="flex">
		<div class={['flex justify-between', size === 'normal' ? 'w-[95px]' : 'w-[129px]']}>
			<Text>{label}</Text>
			<Text>{valueStr}</Text>
		</div>
		{#if add !== 0 || upgrade !== 0 || starforce !== 0}
			<Spacer width={size === 'normal' ? 12 : 15} />
			<StatDetail {base} {add} {upgrade} {starforce} {rate} />
		{/if}
	</div>
{/if}
