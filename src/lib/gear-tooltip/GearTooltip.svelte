<script lang="ts">
	import { GearPropType, PotentialGrade, type Gear } from '@malib/gear';
	import Attributes from './components/Attributes.svelte';
	import Desc from './components/Desc.svelte';
	import DiffExtra from './components/DiffExtra.svelte';
	import Exceptional from './components/Exceptional.svelte';
	import GearGrade from './components/GearGrade.svelte';
	import GearType from './components/GearType.svelte';
	import Icon from './components/Icon.svelte';
	import Incline from './components/Incline.svelte';
	import JobReq from './components/JobReq.svelte';
	import Option from './components/Option.svelte';
	import Potential from './components/Potential.svelte';
	import Req from './components/Req.svelte';
	import Soul from './components/Soul.svelte';
	import Star from './components/Star.svelte';
	import Tuc from './components/Tuc.svelte';
	import { getGearNameColor } from './graphics';
	import { getGearPropString } from './strings';
	import './tooltip.scss';

	/**
	 * 툴팁에 표시할 장비.
	 */
	export let gear: Gear;
	/**
	 * 캐릭터 레벨. 기본값은 `300`입니다. REQ LEV을 표시하는데 사용됩니다.
	 */
	export let characterLevel = 300;
	/**
	 * 캐릭터 STR. 기본값은 `900`입니다. REQ LEV을 표시하는데 사용됩니다.
	 */
	export let characterSTR = 900;
	/**
	 * 캐릭터 DEX. 기본값은 `900`입니다. REQ DEX을 표시하는데 사용됩니다.
	 */
	export let characterDEX = 900;
	/**
	 * 캐릭터 INT. 기본값은 `900`입니다. REQ INT을 표시하는데 사용됩니다.
	 */
	export let characterINT = 900;
	/**
	 * 캐릭터 LUK. 기본값은 `900`입니다. REQ LUK을 표시하는데 사용됩니다.
	 */
	export let characterLUK = 900;
	/**
	 * 캐릭터 직업. 기본값은 `31`입니다. 착용 가능 직업을 표시하는데 사용됩니다.
	 * 초보자는 `0`, 전사는 `1`, 마법사는 `2`, 궁수는 `4`, 도적은 `8`, 해적은 `16`이고 해당하는 직업 분류의 합으료 나타냅니다.
	 */
	export let characterJob = 0x1f;
	/**
	 * 장비의 공격력 증가량입니다. 기본값은 `0`입니다.
	 */
	export let incline = 0;
	/**
	 * 장비의 방어력 차이입니다. 기본값은 `0`입니다.
	 */
	export let pddDiff = 0;
	/**
	 * 장비의 보스 공격 시 데미지 차이입니다. 기본값은 `0`입니다.
	 */
	export let bdrDiff = 0;
	/**
	 * 장비의 몬스터 방어율 무시 차이입니다. 기본값은 `0`입니다.
	 */
	export let imdrDiff = 0;

	export let ref: HTMLDivElement | undefined = undefined;

	$: gearName = `${gear.name}${gear.upgradeCount > 0 ? ` (+${gear.upgradeCount})` : ''}`;
	$: icon = gear.anvil?.icon ?? gear.icon;
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
	<div class="gear-tooltip" bind:this={ref}>
		<div class="gear-tooltip__frame-top" />
		<div class="gear-tooltip__frame-line gear-tooltip__main">
			<Star star={gear.star} maxStar={gear.maxStar} amazing={gear.amazing} />

			<div class="gear-tooltip__title">
				{#if gear.soulWeapon.enchanted && gear.soulWeapon.soul}
					<div class="gt--text gt--text--title gt--text--green">
						{gear.soulWeapon.soul.name.replace(/소울$/, '')}
					</div>
				{/if}
				<div class="gt--text gt--text--title gt--text--{getGearNameColor(gear)}">{gearName}</div>
			</div>

			{#if gear.grade > PotentialGrade.normal}
				<GearGrade
					grade={gear.grade}
					specialGrade={gear.getBooleanValue(GearPropType.specialGrade)}
				/>
			{/if}
			<Attributes {gear} />

			<hr class="gear-tooltip__dotline" style="margin-top: 10px" />

			<div class="gear-tooltip__icon-area">
				<div class="gear-tooltip__icon">
					<Icon
						iconId={icon.id}
						alt={gearName}
						grade={Math.max(gear.grade, gear.additionalGrade)}
						newBonus={gear.isNewBonusType}
					/>
				</div>
				<div class="gear-tooltip__incline">
					<Incline {incline} />
				</div>
				<div class="gear-tooltip__req">
					<Req
						req={gear.req}
						reduceReq={gear.option(GearPropType.reduceReq).sum}
						{characterLevel}
						{characterSTR}
						{characterDEX}
						{characterINT}
						{characterLUK}
					/>
				</div>
			</div>
			<div class="gear-tooltip__diff">
				<DiffExtra {pddDiff} {bdrDiff} {imdrDiff} />
			</div>
			<div class="gear-tooltip__job-req">
				<JobReq
					gearType={gear.type}
					reqJob={gear.req.job}
					reqSpecJob={gear.req.specJob}
					{characterJob}
				/>
			</div>

			<hr class="gear-tooltip__dotline" style="margin-top: 9px" />

			<div class="gear-tooltip__item-detail">
				{#if superior}
					<div class="gt--text gt--text--green">슈페리얼</div>
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
					/>
				{/if}
				{#if gear.hammerCount > 0}
					<div class="gt--text">황금망치 제련 적용</div>
				{/if}
				{#if gear.karma !== undefined}
					<div class="gt--text gt--text--orange2">가위 사용 가능 횟수 : {gear.karma}회</div>
				{/if}
				{#if !gear.canPotential}
					<div class="gt--text">잠재능력 설정 불가</div>
				{/if}
				{#if gear.getBooleanValue(GearPropType.fixedPotential)}
					<div class="gt--text">에디셔널 잠재능력 설정 불가</div>
				{/if}
				{#if superior}
					<div class="gt--text gt--text--green">
						{getGearPropString(GearPropType.superiorEqp, 1)}
					</div>
				{/if}
			</div>

			{#if gear.canPotential && gear.grade > 0 && gear.potentials.some((pot) => pot)}
				<hr class="gear-tooltip__dotline" style="margin-top: 2px" />
				<div class="potential gear-tooltip__part">
					<Potential grade={gear.grade} potentials={gear.potentials} />
				</div>
			{/if}

			{#if gear.canPotential && gear.additionalGrade > 0 && gear.additionalPotentials.some((pot) => pot)}
				<hr class="gear-tooltip__dotline" style="margin-top: 2px" />
				<div class="gear-tooltip__part--add-potential gear-tooltip__part">
					<Potential
						additional
						grade={gear.additionalGrade}
						potentials={gear.additionalPotentials}
					/>
				</div>
			{/if}

			{#if gear.exceptionalTotalUpgradeCount > 0}
				<hr class="gear-tooltip__dotline" style="margin-top: 12px" />
				<div class="gear-tooltip__part--exceptional gear-tooltip__part">
					<Exceptional
						option={gear.exceptionalOptions}
						exceptionalTotalUpgradeCount={gear.exceptionalTotalUpgradeCount}
						exceptionalUpgradeCount={gear.exceptionalUpgradeCount}
					/>
				</div>
			{/if}

			{#if gear.soulWeapon.enchanted}
				<hr class="gear-tooltip__dotline" style="margin-top: 2px" />
				<div class="gear-tooltip__part gear-tooltip__part--soul">
					<Soul
						soul={gear.soulWeapon.soul}
						charge={gear.soulWeapon.charge}
						pad={gear.soulWeapon.chargeOption.get(GearPropType.incPAD) ?? 0}
						mad={gear.soulWeapon.chargeOption.get(GearPropType.incMAD) ?? 0}
					/>
				</div>
			{/if}

			{#if desc.length > 0}
				<hr class="gear-tooltip__dotline" style="margin-top: 2px" />
				<div class="gear-tooltip__part gear-tooltip__part--desc">
					{#each desc as text}
						<Desc {text} />
					{/each}
				</div>
			{/if}

			{#if gear.anvil}
				<div class="gear-tooltip__part gear-tooltip__part--anvil">
					<div class="gt--text">{' '}</div>
					<div class="gt--text gt--text--green">
						신비의 모루에 의해 [{gear.anvil.name}]의 외형이 합성됨
					</div>
				</div>
			{/if}
		</div>
		<div class="gear-tooltip__frame-bottom" />
		<div class="gear-tooltip__frame-cover" />
	</div>
{/if}

<style>
	.gear-tooltip {
		width: 261px;
		position: relative;
		image-rendering: pixelated;
	}

	.gear-tooltip__main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 4px;
		padding-left: 13px;
		padding-right: 13px;
	}

	.gear-tooltip__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -2px;
		margin-bottom: 4px;
	}

	.gear-tooltip__icon-area {
		display: grid;
		padding-top: 6px;
		grid-template-columns: 82px 155px;
		grid-template-rows: 44px 1fr;
	}

	.gear-tooltip__icon {
		grid-column: 1;
		grid-row-start: 1;
		grid-row-end: 3;
		margin-top: 2px;
	}

	.gear-tooltip__req {
		display: flex;
		justify-content: end;
		align-items: end;
		padding-right: 1px;
	}

	.gear-tooltip__diff {
		align-self: flex-start;
		margin-top: 2px;
		margin-left: -1px;
	}

	.gear-tooltip__job-req {
		margin-top: 3px;
	}

	.gear-tooltip__item-detail {
		align-self: flex-start;
		padding-top: 4px;
		padding-bottom: 8px;
		margin-right: -4px;
	}

	.gear-tooltip__part {
		align-self: flex-start;
		margin-top: 4px;
	}

	.gear-tooltip__part--exceptional {
		padding-bottom: 8px;
	}

	.gear-tooltip__part--desc {
		margin-left: -3px;
		margin-right: 4px;
	}

	.gear-tooltip__part--anvil {
		margin-top: 0px;
	}

	.gear-tooltip__frame-top {
		background-image: url(images/frame/top.png);
		width: 261px;
		height: 13px;
	}

	.gear-tooltip__frame-line {
		background-image: url(images/frame/line.png);
		width: 261px;
	}

	.gear-tooltip__frame-bottom {
		background-image: url(images/frame/bottom.png);
		width: 261px;
		height: 13px;
	}

	.gear-tooltip__frame-cover {
		background-image: url(images/frame/cover.png);
		width: 53px;
		height: 43px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.gear-tooltip__dotline {
		background-image: url(images/frame/dotline.png);
		width: 261px;
		height: 2px;
		margin: 0;
		border: none;
	}
</style>
