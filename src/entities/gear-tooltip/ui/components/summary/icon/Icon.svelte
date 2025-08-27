<script lang="ts">
	import { UIImage } from '$lib/shared/ui';
	import { GearIcon } from '$lib/components/icons';
	import { PotentialGrade } from '@malib/gear';

	let { icon, grade, newBonus }: { icon: string; grade: PotentialGrade; newBonus?: boolean } =
		$props();

	let iconBorder: ReturnType<typeof getIconBorder> = $derived(getIconBorder(grade));

	function getIconBorder(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Rare:
				return 'iconBorderRare';
			case PotentialGrade.Epic:
				return 'iconBorderEpic';
			case PotentialGrade.Unique:
				return 'iconBorderUnique';
			case PotentialGrade.Legendary:
				return 'iconBorderLegendary';
		}
	}
</script>

<div class="relative">
	{#if iconBorder}
		<UIImage image={iconBorder} class="absolute top-px left-px" />
	{/if}
	<UIImage image="iconBase">
		<div class="flex h-20 w-20 items-center justify-center">
			<GearIcon icon={icon} scale={2} />
		</div>
	</UIImage>
	<UIImage
		image="iconDotOld"
		class="absolute top-[5px] left-[5px] flex items-center justify-center"
	>
		{#if newBonus}
			<UIImage image="iconDotNew" />
		{/if}
	</UIImage>
	<UIImage image="iconCover" class="absolute top-1 left-1" />
</div>
