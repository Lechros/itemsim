<script lang="ts">
	import type { GearPropType } from '@malib/gear';
	import { optionToStrings } from '../strings';

	export let option: Map<GearPropType, number>;
	export let exceptionalUpgradeCount: number;
	export let exceptionalTotalUpgradeCount: number;
</script>

{#if exceptionalUpgradeCount > 0}
	<div class="exceptional__label">
		<span class="exceptional icon" />
		<span class="gt--text gt--text--red2"> 익셉셔널 </span>
	</div>
	{#each optionToStrings(option) as line}
		<div class="gt--text">
			{line}
		</div>
	{/each}
	<div class="gt--text">
		익셉셔널 강화 {exceptionalUpgradeCount}회 적용 (최대 {exceptionalTotalUpgradeCount}회 강화 가능)
	</div>
{:else}
	<div class="gt--text">익셉셔널 강화가 가능합니다. (최대 : {exceptionalTotalUpgradeCount}회)</div>
{/if}

<style lang="scss">
	.exceptional__label {
		display: flex;
		margin-bottom: 4px;
	}
	.exceptional.icon {
		background-image: url(../images/exceptional/exceptional.png);
		width: 19px;
		height: 13px;
		margin-left: -4px;
		margin-right: 5px;
	}
</style>
