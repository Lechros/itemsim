<script lang="ts">
	import {
		addUpgradeFailCount,
		applyGoldHammer,
		applyScroll,
		applySpellTrace,
		Gear,
		GearPropType,
		GearType,
		recalculateStarforce,
		resetEnhancement,
		resetUpgrade,
		restoreUpgradeCount,
		Scroll,
		type SpellTraceProbability,
		type SpellTraceStatType
	} from '@malib/gear';
	import { gear } from './gear-store';
	import { optionToStrings } from './strings';

	function canUpgrade(gear: Gear) {
		return gear.totalUpgradeCount > 0 && !gear.getBooleanValue(GearPropType.onlyUpgrade);
	}

	$: canHammer = !$gear.getBooleanValue(GearPropType.exceptUpgrade) && $gear.hammerCount === 0;
	$: canFail = !$gear.getBooleanValue(GearPropType.exceptUpgrade) && $gear.upgradeCountLeft > 0;
	$: canRestore = $gear.upgradeFailCount > 0;
	$: canInnocent =
		$gear.hammerCount > 0 || $gear.upgradeCount > 0 || $gear.upgradeFailCount > 0 || $gear.star > 0;
	$: canArkInnocent =
		!$gear.amazing &&
		($gear.hammerCount > 0 || $gear.upgradeCount > 0 || $gear.upgradeFailCount > 0);

	$: canScroll = $gear.upgradeCountLeft > 0;

	const chaosTypes = [
		['STR', GearPropType.incSTR],
		['DEX', GearPropType.incDEX],
		['INT', GearPropType.incINT],
		['LUK', GearPropType.incLUK],
		['최대 HP', GearPropType.incMHP],
		['최대 MP', GearPropType.incMMP],
		['공격력', GearPropType.incPAD],
		['마력', GearPropType.incMAD],
		['방어력', GearPropType.incPDD],
		['이동속도', GearPropType.incSpeed],
		['점프력', GearPropType.incJump]
	] as const;

	const chaosStats = chaosTypes.map((e) => ({ type: e[1], name: e[0], value: 0 }));

	function hammer() {
		applyGoldHammer($gear);
		gear.set($gear);
	}

	function fail() {
		addUpgradeFailCount($gear);
		gear.set($gear);
	}

	function restore() {
		restoreUpgradeCount($gear);
		gear.set($gear);
	}

	function innocent() {
		resetUpgrade($gear);
		resetEnhancement($gear);
		gear.set($gear);
	}

	function arkInnocent() {
		resetUpgrade($gear);
		recalculateStarforce($gear);
		gear.set($gear);
	}

	function scrollSingle(scroll: Scroll) {
		applyScroll($gear, scroll);
		recalculateStarforce($gear);
		gear.set($gear);
	}

	function scrollFull(scroll: Scroll) {
		const count = $gear.upgradeCountLeft;
		for (let i = 0; i < count; i++) {
			applyScroll($gear, scroll);
		}
		recalculateStarforce($gear);
	}

	function spellTraceFull(type: SpellTraceStatType, prob: SpellTraceProbability) {
		const count = $gear.upgradeCountLeft;
		for (let i = 0; i < count; i++) {
			applySpellTrace($gear, type, prob);
		}
		recalculateStarforce($gear);
		gear.set($gear);
	}

	function createChaosScroll(chaos: typeof chaosStats) {
		return new Scroll('', new Map(chaos.map((e) => [e.type, e.value])));
	}

	function getTypes(gear: Gear) {
		const jobStat = [
			[GearPropType.incSTR, GearPropType.incMHP],
			[GearPropType.incINT],
			[GearPropType.incDEX],
			[GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK],
			[GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK]
		] as const;
		let types: SpellTraceStatType[] = [];
		if (gear.req.job === 0) {
			if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
				types = [
					GearPropType.incSTR,
					GearPropType.incDEX,
					GearPropType.incLUK,
					GearPropType.incMHP,
					GearPropType.incINT
				];
			} else {
				types = [
					GearPropType.incSTR,
					GearPropType.incDEX,
					GearPropType.incINT,
					GearPropType.incLUK,
					GearPropType.incMHP
				];
			}
		} else {
			for (let i = 0; i < 5; i++) {
				if ((gear.req.job & (1 << i)) !== 0) {
					for (const stat of jobStat[i]) {
						if (!types.includes(stat)) types.push(stat);
					}
				}
			}
		}
		types.sort((a, b) => a - b);
		if (Gear.isArmor(gear.type)) {
			types.push(GearPropType.incAllStat);
		}
		return types;
	}

	function getSpellTraceInfos(gear: Gear, types: SpellTraceStatType[]) {
		const infos: { scroll: Scroll; type: SpellTraceStatType; prob: SpellTraceProbability }[] = [];
		const probs =
			Gear.isWeapon(gear.type) || gear.type === GearType.katara
				? ([100, 70, 30, 15] as const)
				: ([100, 70, 30] as const);
		for (const type of types) {
			for (const prob of probs) {
				const scroll = Scroll.getSpellTraceScroll(gear, type, prob);
				if (scroll && !infos.some((info) => info.scroll.name === scroll.name)) {
					infos.push({ scroll: scroll, type: type, prob: prob });
				}
			}
		}
		return infos;
	}
</script>

{#if canUpgrade($gear)}
	<div class="upgrade">
		<div class="general">
			<button on:click={() => hammer()} disabled={!canHammer}>
				<div class="hammer icon" />
				황금 망치
			</button>
			<button on:click={() => fail()} disabled={!canFail}>
				<div class="fail icon" />
				주문서 실패
			</button>
			<button on:click={() => restore()} disabled={!canRestore}>
				<div class="restore icon" />
				순백의 주문서
			</button>
			<button on:click={() => innocent()} disabled={!canInnocent}>
				<div class="reset icon" />
				이노센트
			</button>
			<button on:click={() => arkInnocent()} disabled={!canArkInnocent}>
				<div class="reset icon" />
				아크 이노센트
			</button>
		</div>
		<div class="label">
			<div class="spelltrace" />
			<h4>주문의 흔적</h4>
		</div>
		<div class="st">
			{#each getSpellTraceInfos($gear, getTypes($gear)) as info}
				<div class="st-wrapper">
					<button
						title={optionToStrings(info.scroll.stat).join('\n')}
						on:click={() => scrollSingle(info.scroll)}
						disabled={!canScroll}
					>
						<div class="spelltrace-{info.prob} icon" />
						{info.scroll.name}
					</button>
					<button
						title="완작"
						on:click={() => spellTraceFull(info.type, info.prob)}
						disabled={!canScroll}
					>
						+{$gear.upgradeCountLeft}
					</button>
				</div>
			{/each}
		</div>
		<div class="label">
			<div class="chaos" />
			<h4>혼돈의 주문서</h4>
		</div>
		<div class="chaos-wrapper">
			{#each chaosStats as chaos}
				<div>
					<label>
						{chaos.name}
						<input type="number" bind:value={chaos.value} />
					</label>
				</div>
			{/each}
		</div>
		<button class="apply-chaos" on:click={() => scrollSingle(createChaosScroll(chaosStats))}>
			혼돈의 주문서 적용
		</button>
	</div>
{:else}
	주문서 강화 불가
{/if}

<style>
	.label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.general {
		display: grid;
		grid-template-columns: repeat(5, 5em);
		grid-template-rows: 5em;
		gap: 0.5rem;
	}

	.general button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 0.5rem;
	}

	button:disabled .icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
	}

	.st {
		display: flex;
		flex-direction: column;
	}

	.st-wrapper {
		display: flex;
	}

	.st button:first-of-type {
		display: flex;
		align-items: center;
		column-gap: 0.5em;
		width: 15rem;
		height: 2rem;
	}

	.st button:nth-of-type(2) {
		width: 3rem;
	}

	.chaos-wrapper {
		display: grid;
		grid-template-columns: repeat(6, 4rem);
		gap: 1rem;
	}
	.chaos-wrapper > div {
		display: flex;
	}
	.chaos-wrapper input {
		width: 100%;
	}

	.apply-chaos {
		margin-top: 1rem;
		padding: 0.5rem;
		min-width: 5rem;
	}

	.hammer {
		background-image: url(../images/goldenHammer.png);
		width: 30px;
		height: 29px;
	}

	.restore {
		background-image: url(../images/cleanSlate.png);
		width: 30px;
		height: 26px;
	}

	.fail {
		background-image: url(../images/fail.png);
		width: 30px;
		height: 26px;
	}

	.reset {
		background-image: url(../images/innocent.png);
		width: 30px;
		height: 26px;
	}

	.spelltrace {
		background-image: url(../images/spelltrace.png);
		width: 33px;
		height: 33px;
	}

	.spelltrace-100 {
		background-image: url(../images/st100.png);
		width: 30px;
		height: 26px;
	}
	.spelltrace-70 {
		background-image: url(../images/st70.png);
		width: 30px;
		height: 26px;
	}
	.spelltrace-30 {
		background-image: url(../images/st30.png);
		width: 30px;
		height: 26px;
	}
	.spelltrace-15 {
		background-image: url(../images/st15.png);
		width: 31px;
		height: 31px;
	}

	.chaos {
		background-image: url(../images/chaos.png);
		width: 30px;
		height: 26px;
	}
</style>
