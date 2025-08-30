<script lang="ts">
	let {
		scrollTotalUpgradeableCount,
		scrollUpgradeableCount,
		scrollResilienceCount,
		cannotUpgrade
	}: {
		scrollTotalUpgradeableCount: number;
		scrollUpgradeableCount: number;
		scrollResilienceCount: number;
		cannotUpgrade: boolean;
	} = $props();
</script>

{#if scrollTotalUpgradeableCount > 0}
	{#if cannotUpgrade}
		<div class="gt--detail gt--white">강화불가</div>
	{:else}
		<div class="gt--detail gt--white">
			업그레이드 가능 횟수 : {scrollUpgradeableCount}
			<span class="gt--orange2">(복구 가능 횟수 : {scrollResilienceCount})</span>
		</div>
	{/if}
{/if}
