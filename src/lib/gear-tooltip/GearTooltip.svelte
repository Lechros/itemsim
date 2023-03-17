<script lang="ts">
	import { GearPropType, PotentialGrade, type Gear } from '@malib/gear';
	import { getGearNameColor } from './graphics';
	import Attributes from './parts/Attributes.svelte';
	import Desc from './parts/Desc.svelte';
	import DiffExtra from './parts/DiffExtra.svelte';
	import GearGrade from './parts/GearGrade.svelte';
	import GearType from './parts/GearType.svelte';
	import Icon from './parts/Icon.svelte';
	import Incline from './parts/Incline.svelte';
	import JobReq from './parts/JobReq.svelte';
	import Karma from './parts/Karma.svelte';
	import Option from './parts/Option.svelte';
	import Potential from './parts/Potential.svelte';
	import Req from './parts/Req.svelte';
	import Soul from './parts/Soul.svelte';
	import Star from './parts/Star.svelte';
	import Superior from './parts/Superior.svelte';
	import Superior2 from './parts/Superior2.svelte';
	import Title from './parts/Title.svelte';
	import Tuc from './parts/Tuc.svelte';
	import { getGearPropString } from './strings';

	export let gear: Gear;
	export let iconSrc = 'https://maplestory.io/api/KMS/367/item/{}/icon';

	$: gearName = `${gear.name} ${gear.upgradeCount > 0 ? `(+${gear.upgradeCount})` : ''}`;
	$: icon = gear.anvil ?? gear.icon;
	$: superior = gear.getBooleanValue(GearPropType.superiorEqp);
	$: desc = getDescs(gear);

	function getSortedOptions(gear: Gear) {
		return [...gear.options]
			.sort((a, b) => a[0] - b[0])
			.filter((kv) => kv[1].sum != 0)
			.map((kv) => ({ type: kv[0], option: kv[1] }));
	}

	function getDescs(gear: Gear) {
		const desc: string[] = [];
		let value: number;

		if (gear.desc.length > 0) {
			desc.push(gear.desc);
		}
		if (
			gear.getPropValue(GearPropType.tradeBlock) > 0 &&
			(value = gear.getPropValue(GearPropType.tradeAvailable)) > 0
		) {
			desc.push(getGearPropString(GearPropType.tradeAvailable, value));
		}
		if ((value = gear.getPropValue(GearPropType.accountShareTag)) > 0) {
			desc.push(getGearPropString(GearPropType.accountShareTag, value));
		}
		if ((value = gear.getPropValue(GearPropType.jokerToSetItem)) > 0) {
			desc.push(getGearPropString(GearPropType.jokerToSetItem, value));
		}

		const traits = [
			[GearPropType.charismaEXP, '카리스마'],
			[GearPropType.insightEXP, '통찰력'],
			[GearPropType.willEXP, '의지'],
			[GearPropType.craftEXP, '손재주'],
			[GearPropType.senseEXP, '감성'],
			[GearPropType.charmEXP, '매력']
		] as const;
		let traitStr = '';
		for (const [type, name] of traits) {
			if ((value = gear.getPropValue(type)) > 0) {
				traitStr += `, ${name} ${value}`;
			}
		}
		if (traitStr.length > 0) {
			const str = traitStr.substring(2);
			desc.push(
				`#c장착 시 1회에 한해 ${str}의 경험치를 얻을 수 있습니다.(일일제한, 최대치 초과 시 제외)#`
			);
		}

		if (gear.amazing && gear.star > 0) {
			desc.push('#c놀라운 장비강화 주문서가 사용되었습니다.#');
		}

		return desc;
	}
</script>

{#if gear}
	<div class="gear-tooltip">
		<div class="frame-top" />
		<div class="frame-line main">
			<Star star={gear.star} maxStar={gear.maxStar} amazing={gear.amazing} />

			<div class="title-area">
				{#if gear.soulWeapon.enchanted && gear.soulWeapon.soul}
					<Title text={gear.soulWeapon.soul.name.replace(/ 소울$/, ' ')} color="green" />
				{/if}
				<Title text={gearName} color={getGearNameColor(gear)} />
			</div>

			{#if gear.grade > PotentialGrade.normal}
				<GearGrade
					grade={gear.grade}
					specialGrade={gear.getBooleanValue(GearPropType.specialGrade)}
				/>
			{/if}
			<Attributes {gear} />

			<hr class="dotline" style="margin-top: 10px" />

			<div class="icon-area">
				<div class="icon-wrapper">
					<Icon
						src={iconSrc.replace('{}', icon.id.toString())}
						origin={icon.origin}
						alt={gearName}
						grade={Math.max(gear.grade, gear.additionalGrade)}
						newBonus={gear.isNewBonusType}
					/>
				</div>
				<Incline incline={0} />
				<Req req={gear.req} reduceReq={gear.getPropValue(GearPropType.reduceReq)} />
			</div>
			<div class="diff-wrapper">
				<DiffExtra pddDiff={0} bdrDiff={0} imdrDiff={0} />
			</div>
			<div class="job-wrapper">
				<JobReq
					gearType={gear.type}
					reqJob={gear.req.job}
					reqSpecJob={gear.req.specJob}
					characterJob={0x1f}
				/>
			</div>

			<hr class="dotline" style="margin-top: 9px" />

			<div class="item-detail">
				{#if superior}
					<Superior />
				{/if}
				<GearType type={gear.type} attackSpeed={gear.getPropValue(GearPropType.attackSpeed)} />
				{#each getSortedOptions(gear) as entry}
					<Option type={entry.type} option={entry.option} amazing={gear.amazing} />
				{/each}
				{#if gear.totalUpgradeCount > 0}
					<Tuc
						canUpgrade={!gear.getBooleanValue(GearPropType.exceptUpgrade)}
						upgradeCountLeft={gear.upgradeCountLeft}
						upgradeFailCount={gear.upgradeFailCount}
						hammerCount={gear.hammerCount}
					/>
				{/if}
				{#if gear.karma !== undefined}
					<Karma count={gear.karma} />
				{/if}
				{#if superior}
					<Superior2 />
				{/if}
			</div>

			{#if gear.canPotential && gear.grade > 0 && gear.potentials.length > 0}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="potential part">
					<Potential grade={gear.grade} potentials={gear.potentials} />
				</div>
			{/if}

			{#if gear.canPotential && gear.additionalGrade > 0 && gear.additionalPotentials.length > 0}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="add-potential part">
					<Potential
						additional
						grade={gear.additionalGrade}
						potentials={gear.additionalPotentials}
					/>
				</div>
			{/if}

			{#if gear.soulWeapon.enchanted}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="soul part">
					<Soul
						soul={gear.soulWeapon.soul}
						charge={gear.soulWeapon.charge}
						pad={gear.soulWeapon.chargeOption.get(GearPropType.incPAD) ?? 0}
						mad={gear.soulWeapon.chargeOption.get(GearPropType.incMAD) ?? 0}
					/>
				</div>
			{/if}

			{#if desc.length > 0}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="desc part">
					{#each desc as text}
						<Desc {text} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="frame-bottom" />
		<div class="frame-cover" />
	</div>
{/if}

<style>
	@import 'colors.css';

	.gear-tooltip {
		width: 261px;
		position: relative;
		image-rendering: pixelated;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 4px;
	}

	.title-area {
		display: flex;
		flex-direction: column;
		margin-top: -2px;
		align-items: center;
	}
	.icon-area {
		box-sizing: border-box;
		display: grid;
		margin-top: 7px;
		width: 100%;
		padding-left: 12px;
		padding-right: 8px;
		grid-template-columns: 82px 159px;
		grid-template-rows: 44px 36px;
		row-gap: 2px;
	}
	.icon-wrapper {
		grid-column: 1;
		grid-row-start: 1;
		grid-row-end: 3;
		margin-top: 1px;
	}

	.diff-wrapper {
		align-self: flex-start;
		margin-top: 3px;
		margin-left: 12px;
	}
	.job-wrapper {
		margin-top: 3px;
	}

	.item-detail {
		width: 100%;
		box-sizing: border-box;
		margin-top: 4px;
		margin-bottom: 8px;
		padding-left: 13px;
		padding-right: 13px;
	}
	.part {
		width: 100%;
		box-sizing: border-box;
		margin-top: 4px;
		padding-left: 13px;
		padding-right: 13px;
	}
	.part.desc {
		padding-left: 10px;
		padding-right: 17px;
	}

	.frame-top {
		background-image: url(images/frame/top.png);
		width: 261px;
		height: 13px;
	}
	.frame-line {
		background-image: url(images/frame/line.png);
		width: 261px;
	}
	.frame-bottom {
		background-image: url(images/frame/bottom.png);
		width: 261px;
		height: 13px;
	}
	.frame-cover {
		background-image: url(images/frame/cover.png);
		width: 53px;
		height: 43px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.dotline {
		background-image: url(images/frame/dotline.png);
		width: 261px;
		height: 2px;
		margin: 0;
		border: none;
	}
</style>
