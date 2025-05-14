<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip';
	import { GearTooltip as GearTooltip2 } from '$lib/entities/gear-tooltip2';
	import {
		AddOptionType,
		Gear,
		GearCapability,
		PotentialGrade,
		SpellTraceType,
		type AddOptionGrade,
		type GearData
	} from '@malib/gear';

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
		scrollUpgradeableCount: 9,
		exceptionalUpgradeableCount: 1
	}) as GearData;
	const gear = new Gear(data);
	gear.setPotential(PotentialGrade.Unique, [
		{
			grade: PotentialGrade.Unique,
			summary: '보스 몬스터 데미지 +30%',
			option: {
				bossDamage: 30
			}
		},
		{
			grade: PotentialGrade.Epic,
			summary: '몬스터 방어율 무시 +15%',
			option: {
				ignoreMonsterArmor: 15
			}
		},
		{
			grade: PotentialGrade.Epic,
			summary: '마력 +6%',
			option: {
				magicPower: 6
			}
		}
	]);
	gear.setAdditionalPotential(PotentialGrade.Unique, [
		{
			grade: PotentialGrade.Unique,
			summary: '보스 몬스터 데미지 +30%',
			option: {
				bossDamage: 30
			}
		},
		{
			grade: PotentialGrade.Epic,
			summary: '몬스터 방어율 무시 +15%',
			option: {
				ignoreMonsterArmor: 15
			}
		},
		{
			grade: PotentialGrade.Epic,
			summary: '마력 +6%',
			option: {
				magicPower: 6
			}
		}
	]);
	gear.applyExceptional({
		name: '',
		option: {
			str: 20,
			dex: 20,
			int: 20,
			luk: 20,
			maxHp: 1000,
			maxMp: 1000,
			attackPower: 15,
			magicPower: 15
		}
	});
	gear.resetExceptional();
	gear.applySoulEnchant();
	gear.setSoul({
		name: '위대한 루시드의 소울',
		skill: '악몽의 지배자',
		option: {
			bossDamage: 7
		}
	});
	let addOptionType = $state(AddOptionType.str);
	let addOptionGrade: AddOptionGrade = $state(3);
</script>

<div class="flex items-start gap-4">
	<GearTooltip {gear} incline={{ combat: 123456789 }} />
	<GearTooltip2
		{gear}
		incline={{ combat: -127921987 }}
		loadSetItemName={() => '아케인셰이드 세트'}
		loadExclusiveEquips={() => []}
	/>
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
		<button
			disabled={!gear.canApplyScroll}
			onclick={() => gear.applySpellTrace(SpellTraceType.str, 30)}
		>
			힘 주흔 30%
		</button>
		<button disabled={!gear.canApplyScrollFail} onclick={() => gear.applyScrollFail()}>
			주문서 실패
		</button>
		<button disabled={!gear.canApplyResileScroll} onclick={() => gear.applyResileScroll()}>
			주문서 복구
		</button>
		<button disabled={!gear.canResetUpgrade} onclick={() => gear.resetUpgrade()}>
			주문서 초기화
		</button>
		<select bind:value={addOptionType}>
			<option value={AddOptionType.str}>str</option>
			<option value={AddOptionType.dex}>dex</option>
			<option value={AddOptionType.int}>int</option>
			<option value={AddOptionType.luk}>luk</option>
			<option value={AddOptionType.str_dex}>str, dex</option>
			<option value={AddOptionType.str_int}>str, int</option>
			<option value={AddOptionType.str_luk}>str, luk</option>
			<option value={AddOptionType.dex_int}>dex, int</option>
			<option value={AddOptionType.dex_luk}>dex, luk</option>
			<option value={AddOptionType.int_luk}>int, luk</option>
			<option value={AddOptionType.maxHp}>maxHp</option>
			<option value={AddOptionType.maxMp}>maxMp</option>
			<option value={AddOptionType.attackPower}>attackPower</option>
			<option value={AddOptionType.magicPower}>magicPower</option>
			<option value={AddOptionType.armor}>armor</option>
			<option value={AddOptionType.speed}>speed</option>
			<option value={AddOptionType.jump}>jump</option>
			<option value={AddOptionType.bossDamage}>bossDamage</option>
			<option value={AddOptionType.damage}>damage</option>
			<option value={AddOptionType.allStat}>allStat</option>
			<option value={AddOptionType.reqLevelDecrease}>reqLevelDecrease</option>
		</select>
		<input type="number" bind:value={addOptionGrade} />
		<button
			disabled={!gear.canApplyAddOption}
			onclick={() => gear.applyAddOption(addOptionType, addOptionGrade)}
		>
			추가 옵션 적용
		</button>
		<input type="number" bind:value={data.potentialGrade} />
	</div>
</div>
