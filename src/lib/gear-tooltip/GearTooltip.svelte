<script lang="ts">
	import { GearPropType, PotentialGrade, SoulSlot, type Gear } from '@malib/gear';
	import { getGearNameColor } from './graphics';
	import Attributes from './parts/Attributes.svelte';
	import DiffExtra from './parts/DiffExtra.svelte';
	import GearGrade from './parts/GearGrade.svelte';
	import GearType from './parts/GearType.svelte';
	import Icon from './parts/Icon.svelte';
	import Incline from './parts/Incline.svelte';
	import JobReq from './parts/JobReq.svelte';
	import Option from './parts/Option.svelte';
	import Potential from './parts/Potential.svelte';
	import Req from './parts/Req.svelte';
	import Soul from './parts/Soul.svelte';
	import Star from './parts/Star.svelte';
	import Superior from './parts/Superior.svelte';
	import Superior2 from './parts/Superior2.svelte';
	import Title from './parts/Title.svelte';
	import Tuc from './parts/Tuc.svelte';

	export let gear: Gear;
	export let iconSrc = 'https://maplestory.io/api/KMS/367/item/{}/icon';

	$: gearName = `${gear.name} ${gear.upgradeCount > 0 ? `(+${gear.upgradeCount})` : ''}`;
	$: superior = gear.getBooleanValue(GearPropType.superiorEqp);

	function getSortedOptions(gear: Gear) {
		return [...gear.options]
			.sort((a, b) => a[0] - b[0])
			.filter((kv) => kv[1].sum != 0)
			.map((kv) => ({ type: kv[0], option: kv[1] }));
	}
</script>

{#if gear}
	<div class="gear-tooltip">
		<div class="frame-top" />
		<div class="frame-line main">
			<Star star={gear.star} maxStar={gear.maxStar} amazing={gear.amazing} />

			<div class="title-area">
				{#if gear.soulSlot.enchanted && gear.soulSlot.soul}
					<Title text={gear.soulSlot.soul.name.replace(/ 소울$/, ' ')} color="green" />
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
						src={iconSrc.replace('{}', gear.icon.toString())}
						origin={gear.origin}
						alt={gearName}
						grade={Math.max(gear.grade, gear.additionalGrade)}
					/>
				</div>
				<Incline incline={1124091} />
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
					<Option type={entry.type} option={entry.option} />
				{/each}
				{#if gear.totalUpgradeCount > 0}
					<Tuc
						canUpgrade={!gear.getBooleanValue(GearPropType.exceptUpgrade)}
						upgradeCountLeft={gear.upgradeCountLeft}
						upgradeFailCount={gear.upgradeFailCount}
						hammerCount={gear.hammerCount}
					/>
				{/if}
				{#if superior}
					<Superior2 />
				{/if}
			</div>

			{#if gear.canPotential && gear.potentials.length > 0}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="potential part">
					<Potential grade={gear.grade} potentials={gear.potentials} />
				</div>
			{/if}

			{#if gear.canPotential && gear.additionalPotentials.length > 0}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="add-potential part">
					<Potential additional grade={gear.grade} potentials={gear.potentials} />
				</div>
			{/if}

			{#if gear.soulSlot.enchanted}
				<hr class="dotline" style="margin-top: 2px" />
				<div class="soul part">
					<Soul
						soul={gear.soulSlot.soul}
						charge={gear.soulSlot.charge}
						pad={gear.soulSlot.chargeOption.get(GearPropType.incPAD) ?? 0}
						mad={gear.soulSlot.chargeOption.get(GearPropType.incMAD) ?? 0}
					/>
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
