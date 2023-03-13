<script lang="ts">
	import { Gear, GearPropType } from '@malib/gear';

	export let gear: Gear;
</script>

{#if gear.getBooleanValue(GearPropType.exceptUpgrade)}
    <div class="text">
        강화불가
    </div>
{:else if gear.totalUpgradeCount > 0}
	<div class="text">
		업그레이드 가능 횟수 : {gear.upgradeCountLeft}
		<span class="orange2">(복구 가능 횟수 : {gear.upgradeFailCount})</span>
	</div>
    {#if gear.hammerCount > 0}
        <div class="text">
            황금망치 제련 적용
        </div>
    {/if}
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
