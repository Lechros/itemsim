<script lang="ts">
	import {
		ReadonlyGear,
		type GearAddOption,
		type GearBaseOption,
		type GearOption,
		type GearStarforceOption,
		type GearUpgradeOption
	} from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import StatDetail from './StatDetail.svelte';
	import StatLabel from './StatLabel.svelte';
	import StatSum from './StatValue.svelte';

	let {
		gear,
		label,
		key,
		plus = true,
		rate = false,
		size = 'normal'
	}: {
		gear: ReadonlyGear;
		label: string;
		key: keyof GearOption;
		plus?: boolean;
		rate?: boolean;
		size?: 'normal' | 'large';
	} = $props();

	const base = $derived(gear.baseOption[key as keyof GearBaseOption]);
	const add = $derived(gear.addOption[key as keyof GearAddOption]);
	const upgrade = $derived(gear.upgradeOption[key as keyof GearUpgradeOption]);
	const starforce = $derived(gear.starforceOption[key as keyof GearStarforceOption]);
	const sum = $derived(base + add + upgrade + starforce);
</script>

{#if base > 0 || sum > 0}
	<div class="flex">
		<div class={['flex justify-between', size === 'normal' ? 'w-[95px]' : 'w-[129px]']}>
			<StatLabel {label} />
			<StatSum value={sum} {plus} suffix={rate ? '%' : ''} />
		</div>
		{#if add !== 0 || upgrade !== 0 || starforce !== 0}
			<Spacer width={size === 'normal' ? 12 : 15} />
			<StatDetail {base} {add} {upgrade} {starforce} {rate} />
		{/if}
	</div>
{/if}
