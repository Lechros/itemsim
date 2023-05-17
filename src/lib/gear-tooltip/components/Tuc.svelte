<script lang="ts">
	export let canUpgrade: boolean;
	export let upgradeCountLeft: number;
	export let upgradeFailCount: number;
</script>

{#if canUpgrade}
	<div class="gt--text">
		업그레이드 가능 횟수 : {upgradeCountLeft}
		<span class="gt--text--orange2">(복구 가능 횟수 : {upgradeFailCount})</span>
	</div>
{:else}
	<div class="gt--text">강화불가</div>
{/if}
