<script lang="ts">
	import GearTooltip from '$lib/entities/gear-tooltip/ui/GearTooltip.svelte';
	import type { GearData } from '@malib/gear';
	import { AddOptionType, Gear, PotentialGrade, SpellTraceType } from '@malib/gear';

	const gearData: GearData = $state({
		meta: { id: 1452257, version: 1, add: [] },
		name: '아케인셰이드 보우',
		icon: '1452257',
		type: 145,
		req: { level: 200, dex: 600, job: 4 },
		attributes: {
			trade: 1,
			cuttable: 2,
			incline: { charm: 200 },
			bossReward: true,
			attackSpeed: 6
		},
		baseOption: {
			str: 100,
			dex: 100,
			attackPower: 276,
			speed: 19,
			knockback: 80,
			bossDamage: 30,
			ignoreMonsterArmor: 20
		},
		scrollUpgradeableCount: 8,
		maxStar: 25
	});
	const gear = new Gear(gearData);
	if (gear.supportsAddOption) {
		gear.applyAddOption(AddOptionType.dex, 7);
		gear.applyAddOption(AddOptionType.attackPower, 7);
		gear.applyAddOption(AddOptionType.bossDamage, 6);
		gear.applyAddOption(AddOptionType.allStat, 4);
		gear.applyAddOption(AddOptionType.reqLevelDecrease, 5);
	}
	while (gear.canApplyScroll) {
		gear.applySpellTrace(SpellTraceType.dex, 15);
	}
	for (let i = 0; i < 22; i++) {
		if (gear.canApplyStarforce) gear.applyStarforce();
	}
	if (gear.canSetPotential) {
		gear.setPotential(PotentialGrade.Legendary, [
			{ summary: '공격력 : +12%', option: { attackPowerRate: 12 } },
			{ summary: '보스 공격력 : +12%', option: { attackPowerRate: 12 } },
			{ summary: '이상한 공격력 : +12%', option: { attackPowerRate: 12 } }
		]);
	}
	if (gear.canSetAdditionalPotential) {
		gear.setAdditionalPotential(PotentialGrade.Unique, [
			{ summary: '공격력 : +9%', option: { attackPowerRate: 9 } },
			{ summary: '공격력 : +9%', option: { attackPowerRate: 9 } },
			{ summary: '공격력 : +9%', option: { attackPowerRate: 9 } }
		]);
	}
	if (gear.canApplySoulEnchant) {
		gear.applySoulEnchant();
		if (gear.canSetSoul) {
			gear.setSoul({
				name: '강력한 벨룸의 소울',
				option: { attackPower: 6 },
				skill: '기가 벨룸 레이저'
			});
		}
		if (gear.canSetSoulCharge) {
			gear.setSoulCharge(5);
		}
	}

	if (gear.canApplyExceptional) {
		gear.applyExceptional({
			name: '익셉셔널 해머',
			option: {
				str: 15,
				dex: 15,
				int: 15,
				luk: 15,
				maxHp: 750,
				maxMp: 750,
				attackPower: 10,
				magicPower: 10
			}
		});
	}

	gear.shape = {
		name: '여제의 훌륭한 모자',
		icon: '1302221'
	};

	let incline_ = $state({ attack: 1126980, combat: 3520281 });

	let open = $state(false);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<button class="border-2 bg-amber-100 p-2" onclick={() => (open = !open)}>open</button>
{#if open}
	<GearTooltip {gear} incline={incline_} />
{/if}
<button
	class="border-2 bg-amber-100 p-2"
	onclick={() => (gearData.attributes.blockGoldenHammer = !gearData.attributes.blockGoldenHammer)}
>
	blockGoldenHammer
</button>
<button
	class="border-2 bg-amber-100 p-2"
	onclick={() => (gearData.attributes.only = !gearData.attributes.only)}>only</button
>
<button
	class="border-2 bg-amber-100 p-2"
	onclick={() => (gearData.attributes.onlyEquip = !gearData.attributes.onlyEquip)}>onlyEquip</button
>
<input type="number" bind:value={incline_.attack} />
