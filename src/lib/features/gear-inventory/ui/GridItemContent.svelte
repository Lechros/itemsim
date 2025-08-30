<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import PotentialTitle from '$lib/features/gear-enchanter-potential/ui/PotentialTitle.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, ReadonlyGear, type GearData } from '@malib/gear';

	let {
		gearData,
		scale = 1
	}: {
		gearData: GearData;
		scale?: number;
	} = $props();

	const gear = $derived(new ReadonlyGear(gearData));
</script>

<GearIcon icon={gear.shapeIcon} {scale} />
{#if gear.star || gear.scrollUpgradeCount}
	<div class="absolute top-1.5 left-1.5 flex gap-1">
		{#if gear.star}
			<Badge variant="outline" class="bg-background/60 backdrop-blur">
				<UIImage2 image={gear.starScroll ? 'blueStar' : 'star'} />
				{gear.star}
			</Badge>
		{/if}
		{#if gear.scrollUpgradeCount}
			<Badge variant="outline" class="bg-background/60 backdrop-blur">
				<UIImage2 image="scrollEnhanced" />
				{gear.scrollUpgradeCount}
			</Badge>
		{/if}
	</div>
{/if}
{#if gear.attributes.canPotential !== GearCapability.Cannot}
	<div class="absolute right-2 bottom-2 flex flex-col gap-1">
		<PotentialTitle grade={gear.potentialGrade} />
		<PotentialTitle grade={gear.additionalPotentialGrade} />
	</div>
{/if}
{#if gear.exceptionalTotalUpgradeableCount > 0}
	<div class="absolute bottom-2 left-2 flex flex-col gap-1">
		{#if gear.exceptionalUpgradeCount > 0}
			<UIImage2 image="exceptionalNormal" />
		{:else}
			<UIImage2 image="potentialTitleNormal" />
		{/if}
	</div>
{/if}
