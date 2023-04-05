<script lang="ts">
	import {
		addUpgradeFailCount,
		applyGoldHammer,
		applyScroll,
		applySpellTrace,
		Gear,
		GearPropType,
		GearType,
		getSpellTraceScroll,
		recalculateStarforce,
		resetEnhancement,
		resetUpgrade,
		restoreUpgradeCount,
		type Scroll,
		type SpellTraceProbability,
		type SpellTraceStatType
	} from '@malib/gear';
	import {
		Button,
		ClickableTile,
		Column,
		ContentSwitcher,
		Dropdown,
		Grid,
		NumberInput,
		Row,
		Select,
		SelectItem,
		Switch
	} from 'carbon-components-svelte';
	import { text } from 'svelte/internal';
	import { gear } from './gear-store';
	import { optionToStrings } from './strings';

	/* general */
	function canUpgrade() {
		return $gear.totalUpgradeCount > 0 && !$gear.getBooleanValue(GearPropType.onlyUpgrade);
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
		gear.set($gear);
	}

	let selectedId = 0;

	/* 0: spell trace */
	$: spellTraces = getSpellTraceInfos($gear, getTypes($gear));
	let spellTraceProbIdx = 0;
	$: if (!is15gear($gear) && spellTraceProbIdx === 4) spellTraceProbIdx = 0;
	$: selectedProb = [-1, 100, 70, 30, 15][spellTraceProbIdx];

	function spellTraceFull(type: SpellTraceStatType, prob: SpellTraceProbability) {
		const count = $gear.upgradeCountLeft;
		for (let i = 0; i < count; i++) {
			applySpellTrace($gear, type, prob);
		}
		recalculateStarforce($gear);
		gear.set($gear);
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
		const probs = is15gear(gear) ? ([100, 70, 30, 15] as const) : ([100, 70, 30] as const);
		for (const type of types) {
			for (const prob of probs) {
				const scroll = getSpellTraceScroll(gear, type, prob);
				if (scroll && !infos.some((info) => info.scroll.name === scroll.name)) {
					infos.push({ scroll: scroll, type: type, prob: prob });
				}
			}
		}
		return infos;
	}

	function is15gear(gear: Gear) {
		return Gear.isWeapon(gear.type) || gear.type === GearType.katara;
	}

	/* 1: pad, mad scroll */
	const MAX_PAD = 5;

	let pad = 0;
	let mad = 0;

	function getPadName(pad: number, mad: number) {
		if (pad > 0 && mad > 0) {
			return `공격력 ${pad}, 마력 ${mad} 적용`;
		} else if (pad > 0) {
			return `공격력 ${pad} 적용`;
		} else if (mad > 0) {
			return `마력 ${mad} 적용`;
		} else {
			return `적용`;
		}
	}

	function getPadScroll(pad: number, mad: number) {
		return {
			name: '',
			stat: new Map([
				[GearPropType.incPAD, pad],
				[GearPropType.incMAD, mad]
			])
		};
	}

	/* 2: chaos scroll */
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

	function getPropWeight(type: GearPropType) {
		switch (type) {
			case GearPropType.incMHP:
			case GearPropType.incMMP:
				return 10;
			default:
				return 1;
		}
	}

	function getChaosStatsName(stats: typeof chaosStats) {
		const count = stats.reduce((cnt, stat) => (stat.value !== 0 ? cnt + 1 : cnt), 0);
		if (count === 0) {
			return ' 적용';
		} else {
			let count = 0;
			let str = '';
			for (const stat of stats) {
				if (stat.value === 0) continue;
				if (count >= 3) {
					str += ', ...';
					break;
				}
				const valueStr = (stat.value > 0 ? '+' : '') + stat.value;
				if (str !== '') {
					str += ', ';
				}
				str += `${stat.name} ${valueStr}`;
				count++;
			}
			return str + ' 적용';
		}
	}

	function createChaosScroll(stats: typeof chaosStats) {
		return { name: '', stat: new Map(stats.map((e) => [e.type, e.value])) };
	}
</script>

{#if $gear && canUpgrade()}
	<Row>
		<Column>
			<div class="general">
				<ClickableTile light on:click={() => hammer()} disabled={!canHammer} style="min-width: 0;">
					<div class="wrapper">
						<div class="hammer icon" />
						황금 망치
					</div>
				</ClickableTile>
				<ClickableTile light on:click={() => fail()} disabled={!canFail} style="min-width: 0;">
					<div class="wrapper">
						<div class="fail icon" />
						주문서 실패
					</div>
				</ClickableTile>
				<ClickableTile
					light
					on:click={() => restore()}
					disabled={!canRestore}
					style="min-width: 0;"
				>
					<div class="wrapper">
						<div class="restore icon" />
						순백의 주문서
					</div>
				</ClickableTile>
				<ClickableTile
					light
					on:click={() => innocent()}
					disabled={!canInnocent}
					style="min-width: 0;"
				>
					<div class="wrapper">
						<div class="reset icon" />
						이노센트
					</div>
				</ClickableTile>
				<ClickableTile
					light
					on:click={() => arkInnocent()}
					disabled={!canArkInnocent}
					style="min-width: 0;"
				>
					<div class="wrapper">
						<div class="reset icon" />
						아크 이노센트
					</div>
				</ClickableTile>
			</div>
		</Column>
	</Row>

	<Dropdown
		titleText="주문서 분류"
		bind:selectedId
		items={[
			{ id: 0, text: '주문의 흔적' },
			{ id: 1, text: '공격력/마력 주문서' },
			{ id: 2, text: '혼돈의 주문서' },
			{ id: 3, text: '특수 주문서' },
			{ id: 4, text: '전용 주문서' }
		]}
		style="margin-top: 1rem;"
		let:item
	>
		<div class="dropdown-item">
			<div class="icon-wrapper">
				<div class="scroll-icon-{item.id}" />
			</div>
			{item.text}
		</div>
	</Dropdown>

	{#if selectedId === 0}
		<!-- spell trace -->
		<ContentSwitcher
			bind:selectedIndex={spellTraceProbIdx}
			style="margin-top: 2rem; margin-bottom: 1rem"
		>
			<Switch text="전체" />
			<Switch text="100%" />
			<Switch text="70%" />
			<Switch text="30%" />
			{#if is15gear($gear)}
				<Switch text="15%" />
			{/if}
		</ContentSwitcher>

		{#each spellTraces.filter((st) => selectedProb === -1 || selectedProb === st.prob) as info, i}
			<div class="st-line-wrapper {i === 0 ? 'first' : ''}">
				<ClickableTile
					light
					title={optionToStrings(info.scroll.stat).join('\n')}
					on:click={() => scrollSingle(info.scroll)}
					disabled={!canScroll}
					style="min-height: 0;"
				>
					<div class="st-content-wrapper">
						<div class="st-icon-wrapper">
							<div class="spelltrace-{info.prob} icon" />
						</div>
						{info.scroll.name}
					</div>
				</ClickableTile>
				<div class="vr" />
				<ClickableTile
					light
					on:click={() => spellTraceFull(info.type, info.prob)}
					disabled={!canScroll}
					style="min-width: 0; min-height: 0;"
				>
					+{$gear.upgradeCountLeft}
				</ClickableTile>
			</div>
		{/each}
	{:else if selectedId === 1}
		<!-- pad, mad scroll -->
		<Row style="margin-top: 2rem;">
			<Column>
				<Select bind:selected={pad} labelText="공격력">
					{#each { length: MAX_PAD + 1 } as _, i}
						<SelectItem value={i} />
					{/each}
				</Select>
			</Column>
			<Column>
				<Select bind:selected={mad} labelText="마력">
					{#each { length: MAX_PAD + 1 } as _, i}
						<SelectItem value={i} />
					{/each}
				</Select>
			</Column>
		</Row>
		<Row style="margin-top: 1rem;">
			<Column>
				<Button disabled={!canScroll} on:click={() => scrollSingle(getPadScroll(pad, mad))}>
					{getPadName(pad, mad)}
				</Button>
				<Button
					kind="tertiary"
					disabled={!canScroll}
					on:click={() => scrollFull(getPadScroll(pad, mad))}
				>
					{$gear.upgradeCountLeft}회 적용
				</Button>
			</Column>
		</Row>
	{:else if selectedId === 2}
		<!-- chaos scroll -->
		<Row style="margin-top: 1rem;">
			{#each chaosStats as chaos}
				<Column style="margin-top: 1rem;">
					<NumberInput
						label={chaos.name}
						bind:value={chaos.value}
						min={-6 * getPropWeight(chaos.type)}
						max={6 * getPropWeight(chaos.type)}
						step={1 * getPropWeight(chaos.type)}
						invalid={!Number.isInteger(chaos.value / getPropWeight(chaos.type))}
					/>
				</Column>
			{/each}
		</Row>
		<Row style="margin-top: 1rem;">
			<Column>
				<Button disabled={!canScroll} on:click={() => scrollSingle(createChaosScroll(chaosStats))}>
					<span class="collapse-text">{getChaosStatsName(chaosStats)}</span>
				</Button>
				<Button
					kind="tertiary"
					disabled={!canScroll}
					on:click={() => scrollFull(createChaosScroll(chaosStats))}
				>
					{$gear.upgradeCountLeft}회 적용
				</Button>
			</Column>
		</Row>
	{/if}
	{#if false}
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
	{/if}
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
		grid-template-columns: repeat(5, 1fr);
		margin-top: 1rem;
	}
	.general > * {
		border: 5px solid red;
	}

	@media (max-width: 32rem) {
		.general {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.general .wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		line-height: normal;
		gap: 0.5rem;
	}

	.st-line-wrapper {
		display: grid;
		grid-template-columns: 2fr 1px 1fr;
	}
	@media (max-width: 32rem) {
		.st-line-wrapper {
			grid-template-columns: 3fr 1px 1fr;
		}
	}
	.st-line-wrapper:not(.first) {
		border-top: 1px solid #e0e0e0;
	}

	.vr {
		background-color: #e0e0e0;
	}

	.st-content-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.st-icon-wrapper {
		display: flex;
		height: 1em;
		align-items: center;
	}

	.dropdown-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		height: 1rem;
	}

	.icon-wrapper {
		width: 2rem;
		height: 2rem;
	}

	* p .icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
	}

	.collapse-text {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.scroll-icon-0 {
		background-image: url(../images/spelltrace.png);
		width: 33px;
		height: 33px;
		margin-left: 1px;
	}

	.scroll-icon-1 {
		background-image: url(../images/padScroll.png);
		width: 38px;
		height: 36px;
		margin-top: -1px;
		margin-left: -2px;
	}

	.scroll-icon-2 {
		background-image: url(../images/chaos.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	.scroll-icon-3 {
		background-image: url(../images/specialScroll.png);
		width: 33px;
		height: 33px;
	}

	.scroll-icon-4 {
		background-image: url(../images/onlyScroll.png);
		width: 32px;
		height: 29px;
		margin-top: 1px;
	}

	.hammer {
		background-image: url(../images/goldenHammer.png);
		width: 30px;
		height: 29px;
		margin-top: 3px;
		margin-left: 3px;
	}

	.restore {
		background-image: url(../images/cleanSlate.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	.fail {
		background-image: url(../images/fail.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	.reset {
		background-image: url(../images/innocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	.spelltrace-100 {
		background-image: url(../images/st100.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace-70 {
		background-image: url(../images/st70.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace-30 {
		background-image: url(../images/st30.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace-15 {
		background-image: url(../images/st15.png);
		width: 31px;
		height: 31px;
		margin-top: 3px;
		margin-left: 2px;
	}

	.chaos {
		background-image: url(../images/chaos.png);
		width: 30px;
		height: 26px;
	}
</style>
