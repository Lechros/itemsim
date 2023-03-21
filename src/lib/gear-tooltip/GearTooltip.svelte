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
	import Option from './parts/Option.svelte';
	import Potential from './parts/Potential.svelte';
	import Req from './parts/Req.svelte';
	import Soul from './parts/Soul.svelte';
	import Star from './parts/Star.svelte';
	import Tuc from './parts/Tuc.svelte';
	import { getGearPropString } from './strings';

	/**
	 * 툴팁에 표시할 장비.
	 */
	export let gear: Gear;
	/**
	 * 캐릭터 레벨. 기본값은 `300`입니다. REQ LEV을 표시하는데 사용됩니다.
	 */
	export let characterLevel: number = 300;
	/**
	 * 캐릭터 STR. 기본값은 `900`입니다. REQ LEV을 표시하는데 사용됩니다.
	 */
	export let characterSTR: number = 900;
	/**
	 * 캐릭터 DEX. 기본값은 `900`입니다. REQ DEX을 표시하는데 사용됩니다.
	 */
	export let characterDEX: number = 900;
	/**
	 * 캐릭터 INT. 기본값은 `900`입니다. REQ INT을 표시하는데 사용됩니다.
	 */
	export let characterINT: number = 900;
	/**
	 * 캐릭터 LUK. 기본값은 `900`입니다. REQ LUK을 표시하는데 사용됩니다.
	 */
	export let characterLUK: number = 900;
	/**
	 * 캐릭터 직업. 기본값은 `31`입니다. 착용 가능 직업을 표시하는데 사용됩니다.
	 * 초보자는 `0`, 전사는 `1`, 마법사는 `2`, 궁수는 `4`, 도적은 `8`, 해적은 `16`이고 해당하는 직업 분류의 합으료 나타냅니다.
	 */
	export let characterJob: number = 0x1f;
	/**
	 * 장비의 공격력 증가량입니다. 기본값은 `0`입니다.
	 */
	export let incline: number = 0;
	/**
	 * 장비의 방어력 차이입니다. 기본값은 `0`입니다.
	 */
	export let pddDiff: number = 0;
	/**
	 * 장비의 보스 공격 시 데미지 차이입니다. 기본값은 `0`입니다.
	 */
	export let bdrDiff: number = 0;
	/**
	 * 장비의 몬스터 방어율 무시 차이입니다. 기본값은 `0`입니다.
	 */
	export let imdrDiff: number = 0;

	export let iconSrc = 'https://maplestory.io/api/KMS/367/item/{}/icon';

	$: gearName = `${gear.name} ${gear.upgradeCount > 0 ? `(+${gear.upgradeCount})` : ''}`;
	$: icon = gear.anvilIcon ?? gear.icon;
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
					<div class="title green">{gear.soulWeapon.soul.name.replace(/소울$/, '')}</div>
				{/if}
				<div class="title {getGearNameColor(gear)}">{gearName}</div>
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
				<Incline {incline} />
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
			<div class="diff-wrapper">
				<DiffExtra {pddDiff} {bdrDiff} {imdrDiff} />
			</div>
			<div class="job-wrapper">
				<JobReq
					gearType={gear.type}
					reqJob={gear.req.job}
					reqSpecJob={gear.req.specJob}
					{characterJob}
				/>
			</div>

			<hr class="dotline" style="margin-top: 9px" />

			<div class="item-detail">
				{#if superior}
					<div class="text green">슈페리얼</div>
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
					<div class="text orange2">가위 사용 가능 횟수 : {gear.karma}회</div>
				{/if}
				{#if superior}
					<div class="text green">{getGearPropString(GearPropType.superiorEqp, 1)}</div>
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

			{#if gear.anvilIcon && gear.anvilName}
				<div class="anvil part">
					<div class="text">{' '}</div>
					<div class="text green">신비의 모루에 의해 [{gear.anvilName}]의 외형이 합성됨</div>
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

	.part.anvil {
		margin-top: 0px;
	}

	.title {
		line-height: 19px;
		font-size: 14px;
		font-family: 돋움;
		font-weight: bold;
		white-space: pre;
	}
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		white-space: pre-wrap;
	}

	.gray {
		color: var(--gear-gray);
	}
	.orange2 {
		color: var(--gear-orange2);
	}
	.white {
		color: var(--gear-white);
	}
	.blue {
		color: var(--gear-blue);
	}
	.purple {
		color: var(--gear-purple);
	}
	.orange2 {
		color: var(--gear-orange2);
	}
	.green {
		color: var(--gear-green);
	}
	.red {
		color: var(--gear-red);
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
