<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip';
	import { Gear } from '@malib/gear';

	const gear = new Gear({
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
	});

	$effect(() => {});
</script>

<GearTooltip {gear} incline={{ attack: 100 }} />
