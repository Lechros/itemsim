<script lang="ts">
	import { getGearIconOrigin, getGearIconUrl } from '$lib/shared/api';
	import { tooltip2Images } from '$lib/shared/assets';
	import { Badge } from '$lib/shared/shadcn/components/ui/badge';
	import { OriginIcon, UIImage2 } from '$lib/shared/ui';
	import { PotentialGrade, ReadonlyGear, type GearData } from '@malib/gear';

	let {
		gearData,
		href,
		scale = 1,
		onmouseenter,
		onmouseleave
	}: {
		gearData: GearData;
		href?: string;
		scale?: number;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
	} = $props();

	const gear = $derived(new ReadonlyGear(gearData));

	let origin: [number, number] | undefined = $state(undefined);

	$effect(() => {
		(async () => {
			origin = await getGearIconOrigin(gear.shapeIcon);
		})();
	});

	function getPotentialImage(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'potentialTitleNormal';
			case PotentialGrade.Rare:
				return 'potentialTitleRare';
			case PotentialGrade.Epic:
				return 'potentialTitleEpic';
			case PotentialGrade.Unique:
				return 'potentialTitleUnique';
			case PotentialGrade.Legendary:
				return 'potentialTitleLegendary';
		}
	}
</script>

<a
	{href}
	class="bg-card focus-visible:border-ring focus-visible:ring-ring/50 hover:bg-accent relative flex aspect-square items-center justify-center gap-6 rounded-lg border py-6 shadow-sm transition-all hover:shadow-md"
	{onmouseenter}
	{onmouseleave}
>
	<OriginIcon src={getGearIconUrl(gear.shapeIcon)} {origin} alt={gear.name} {scale} />
	<div class="absolute top-1.5 left-1.5 flex gap-1">
		{#if gear.star}
			<Badge variant="secondary">
				<UIImage2 image={gear.starScroll ? 'blueStar' : 'star'} />
				{gear.star}
			</Badge>
		{/if}
		{#if gear.scrollUpgradeCount}
			<Badge variant="secondary">
				<i
					class="scroll-icon bg-current opacity-60"
					style="mask-image: url({tooltip2Images.scrollIcon});"
				></i>
				{gear.scrollUpgradeCount}
			</Badge>
		{/if}
	</div>
	<div class="absolute right-2 bottom-2 flex flex-col gap-1">
		<UIImage2 image={getPotentialImage(gear.potentialGrade)} />
		<UIImage2 image={getPotentialImage(gear.additionalPotentialGrade)} />
	</div>
	<div class="absolute bottom-2 left-2 flex flex-col gap-1">
		{#if gear.exceptionalTotalUpgradeableCount > 0}
			{#if gear.exceptionalUpgradeCount > 0}
				<UIImage2 image="exceptionalNormal" />
			{:else}
				<UIImage2 image="potentialTitleNormal" />
			{/if}
		{/if}
	</div>
</a>

<style>
	.scroll-icon {
		width: 11px;
		height: 10px;
		image-rendering: pixelated;
	}
</style>
