<script lang="ts">
	import {
		ReadonlyGear,
		type GearAddOption,
		type GearBaseOption,
		type GearOption,
		type GearStarforceOption,
		type GearUpgradeOption
	} from '@malib/gear';
	import { getOptionStrings } from '../../../model/option';
	import NewText from '../NewText.svelte';
	import Spacer from '../Spacer.svelte';
	import StatDetail from './StatDetail.svelte';
	import { cn } from '$lib/shared/shadcn/utils';

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

	const isFirstLetterAlphabet = $derived(label[0]?.match(/[a-zA-Z]/));
</script>

{#if base > 0 || sum > 0}
	<div class="flex">
		<NewText value="{label}   {valueStr}" />
		{#if add !== 0 || upgrade !== 0 || starforce !== 0}
			<Spacer width={6} />
			<StatDetail {base} {add} {upgrade} {starforce} {rate} />
		{/if}
	</div>
{/if}
