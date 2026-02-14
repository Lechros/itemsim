<script lang="ts">
	import { GearGender } from '@malib/gear';

	let {
		name,
		gender,
		scrollUpgradeCount,
		color
	}: { name: string; gender: GearGender | undefined; scrollUpgradeCount: number; color: string } =
		$props();
</script>

<div class="gt--title gt--{color}">
	{name}
	{#if gender === GearGender.Male}
		(남)
	{:else if gender === GearGender.Female}
		(여)
	{/if}
	{#if scrollUpgradeCount > 0}
		(+{scrollUpgradeCount})
	{/if}
</div>
