<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip';
	import { GearTooltip as GearTooltip2 } from '$lib/entities/gear-tooltip2';
	import { Gear, type GearData } from '@malib/gear';

	const data = $state({
		meta: {
			id: 1212120,
			version: 1
		},
		name: '아케인셰이드 샤이닝로드',
		icon: '1212120',
		type: 1212,
		req: {
			level: 200,
			job: 2
		},
		attributes: {
			trade: 2,
			cuttable: 2,
			setItemId: 618,
			bossReward: true,
			incline: {
				charm: 200
			},
			canStarforce: 1,
			canScroll: 1,
			canAddOption: 1,
			canPotential: 1,
			canAdditionalPotential: 1
		},
		baseOption: {
			int: 100,
			luk: 100,
			attackPower: 206,
			magicPower: 347,
			bossDamage: 30,
			ignoreMonsterArmor: 20
		},
		scrollUpgradeableCount: 9
	}) satisfies GearData;
	const gear = new Gear(data);
</script>

<div class="flex items-start gap-4">
	<GearTooltip {gear} incline={{ combat: 123456789 }} />
	<GearTooltip2 {gear} incline={{ combat: -1231231 }} />
	<div class="flex flex-col items-start gap-2">
		<button disabled={!gear.canApplyStarforce} onclick={() => gear.applyStarforce()}>
			스타포스
		</button>
		<button disabled={!gear.canApplyStarScroll} onclick={() => gear.applyStarScroll()}>
			놀장
		</button>
		<button disabled={!gear.canResetStarforce} onclick={() => gear.resetStarforce()}>
			스타포스 초기화
		</button>
	</div>
</div>
