<script lang="ts">
	import { GearIcon } from '$lib/entities/gear-icon';
	import PotentialTitle from '$lib/features/gear-enchanter-potential/ui/PotentialTitle.svelte';
	import { tooltip2Images } from '$lib/shared/assets';
	import { Badge } from '$lib/shared/shadcn/components/ui/badge';
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
<div class="absolute top-1.5 left-1.5 flex gap-1">
	{#if gear.star}
		<Badge variant="outline">
			<UIImage2 image={gear.starScroll ? 'blueStar' : 'star'} />
			{gear.star}
		</Badge>
	{/if}
	{#if gear.scrollUpgradeCount}
		<Badge variant="outline">
			<i
				class="scroll-icon bg-current opacity-60"
				style="mask-image: url({tooltip2Images.scrollIcon});"
			></i>
			{gear.scrollUpgradeCount}
		</Badge>
	{/if}
</div>
{#if gear.attributes.canPotential !== GearCapability.Cannot}
	<div class="absolute right-2 bottom-2 flex flex-col gap-1">
		<PotentialTitle grade={gear.potentialGrade} />
		<PotentialTitle grade={gear.additionalPotentialGrade} />
	</div>
{/if}
<div class="absolute bottom-2 left-2 flex flex-col gap-1">
	{#if gear.exceptionalTotalUpgradeableCount > 0}
		{#if gear.exceptionalUpgradeCount > 0}
			<UIImage2 image="exceptionalNormal" />
		{:else}
			<UIImage2 image="potentialTitleNormal" />
		{/if}
	{/if}
</div>

<style>
	.scroll-icon {
		width: 11px;
		height: 10px;
		image-rendering: pixelated;
	}
</style>
