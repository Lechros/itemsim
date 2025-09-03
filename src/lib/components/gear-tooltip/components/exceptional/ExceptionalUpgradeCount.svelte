<script lang="ts">
	let {
		exceptionalUpgradeCount,
		exceptionalTotalUpgradeCount
	}: {
		exceptionalUpgradeCount: number;
		exceptionalTotalUpgradeCount: number;
	} = $props();
</script>

{#if exceptionalUpgradeCount > 0}
	<div class="gt--detail gt--white">
		익셉셔널 강화 {exceptionalUpgradeCount}회 적용 (최대 {exceptionalTotalUpgradeCount}회 강화 가능)
	</div>
{:else}
	<div class="gt--detail gt--white">
		익셉셔널 강화가 가능합니다. (최대 : {exceptionalTotalUpgradeCount}회)
	</div>
{/if}
