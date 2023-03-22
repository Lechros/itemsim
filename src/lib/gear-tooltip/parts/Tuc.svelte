<script lang="ts">
	export let canUpgrade: boolean;
	export let upgradeCountLeft: number;
	export let upgradeFailCount: number;
</script>

{#if canUpgrade}
	<div class="text">
		업그레이드 가능 횟수 : {upgradeCountLeft}
		<span class="orange2">(복구 가능 횟수 : {upgradeFailCount})</span>
	</div>
{:else}
	<div class="text">강화불가</div>
{/if}

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
	}

	.text .orange2 {
		color: var(--gear-orange2);
	}
</style>
