<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Button, Column, Dropdown, Row } from 'carbon-components-svelte';
	import {
		canArkInnocentScroll,
		canCleanSlateScroll,
		canFailScroll,
		canGoldHammer,
		canInnocentScroll,
		canUpgrade,
		doArkInnocentScroll,
		doCleanSlateScroll,
		doFailScroll,
		doGoldHammer,
		doInnocentScroll,
		isOnlyUpgradeGear
	} from '../domains/upgrade/common';
	import { resultOrFalse } from '../domains/util';
	import PadMadScroll from './upgrade/PadMadScroll.svelte';
	import SpellTrace from './upgrade/SpellTrace.svelte';
	import ChaosScroll from './upgrade/ChaosScroll.svelte';
	import OnlyScroll from './upgrade/OnlyScroll.svelte';
	import CommonButton from './upgrade/CommonButton.svelte';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canUpgrade, gear);

	$: canHammer = resultOrFalse(canGoldHammer, gear);
	$: canFail = resultOrFalse(canFailScroll, gear);
	$: canCleanSlate = resultOrFalse(canCleanSlateScroll, gear);
	$: canInnocent = resultOrFalse(canInnocentScroll, gear);
	$: canArkInnocent = resultOrFalse(canArkInnocentScroll, gear);

	$: onlyUpgrade = resultOrFalse(isOnlyUpgradeGear, gear);
	let hasOnlyScroll: boolean;

	function hammer() {
		if (!gear) return;
		gear = doGoldHammer(gear);
	}

	function fail() {
		if (!gear) return;
		gear = doFailScroll(gear);
	}

	function cleanSlate() {
		if (!gear) return;
		gear = doCleanSlateScroll(gear);
	}

	function innocent() {
		if (!gear) return;
		gear = doInnocentScroll(gear);
	}

	function arkInnocent() {
		if (!gear) return;
		gear = doArkInnocentScroll(gear);
	}

	let scrollType = 0;
	$: {
		if (onlyUpgrade && scrollType !== 4) scrollType = 4;
		else if (!hasOnlyScroll && scrollType === 4) scrollType = 0;
	}
</script>

<div class="upgrade">
	{#if can && gear}
		<div class="upgrade__common">
			<Row>
				<Column>
					<div class="common-buttons">
						<CommonButton on:click={hammer} disabled={!canHammer}>
							<div class="common-button__icon common-button__icon--hammer" />
							황금 망치
						</CommonButton>
						<CommonButton on:click={fail} disabled={!canFail}>
							<div class="common-button__icon common-button__icon--fail" />
							주문서 실패
						</CommonButton>
						<CommonButton on:click={cleanSlate} disabled={!canCleanSlate}>
							<div class="common-button__icon common-button__icon--clean-slate" />
							순백의 주문서
						</CommonButton>
						<CommonButton on:click={innocent} disabled={!canInnocent}>
							<div class="common-button__icon common-button__icon--innocent" />
							이노센트
						</CommonButton>
						<CommonButton on:click={arkInnocent} disabled={!canArkInnocent}>
							<div class="common-button__icon common-button__icon--ark-innocent" />
							아크 이노센트
						</CommonButton>
					</div>
				</Column>
			</Row>
		</div>

		<div class="upgrade__scroll-type">
			<Row>
				<Column>
					<Dropdown
						titleText="주문서 분류"
						bind:selectedId={scrollType}
						items={[
							{ id: 0, text: '주문의 흔적', disabled: onlyUpgrade },
							{ id: 1, text: '공격력/마력 주문서', disabled: onlyUpgrade },
							{ id: 2, text: '혼돈의 주문서', disabled: onlyUpgrade },
							{ id: 3, text: '특수 주문서', disabled: onlyUpgrade },
							{ id: 4, text: '전용 주문서', disabled: !hasOnlyScroll }
						]}
						let:item
					>
						<div class="scroll-type__content">
							<div class="scroll-type__icon-wrapper">
								<div class="scroll-type__icon scroll-type__icon--{item.id}" />
							</div>
							{item.text}
						</div>
					</Dropdown>
				</Column>
			</Row>
		</div>

		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 0}>
			<SpellTrace bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 1}>
			<PadMadScroll bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 2}>
			<ChaosScroll bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 3} />
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 4}>
			<OnlyScroll bind:gear bind:has={hasOnlyScroll} />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 5} />
	{:else}
		<div class="upgrade__cannont">주문서 강화 불가</div>
	{/if}
</div>

<style>
	.upgrade {
		margin-top: var(--cds-spacing-05);
	}

	.common-buttons {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}
	@media (max-width: 32rem) {
		.common-buttons {
			grid-template-columns: 1fr;
		}
	}

	* button[disabled] .common-button__icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
	}

	.common-button__icon--hammer {
		background-image: url(../images/upgrade/goldenHammer.png);
		width: 30px;
		height: 29px;
		margin-top: 3px;
		margin-left: 3px;
	}
	.common-button__icon--clean-slate {
		background-image: url(../images/upgrade/cleanSlate.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--fail {
		background-image: url(../images/upgrade/fail.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--innocent {
		background-image: url(../images/upgrade/innocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--ark-innocent {
		background-image: url(../images/upgrade/arkInnocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	.upgrade__scroll-type {
		margin-top: var(--cds-spacing-05);
	}

	.scroll-type__content {
		display: flex;
		align-items: center;
	}

	.scroll-type__icon-wrapper {
		display: flex;
		align-items: center;
		width: var(--cds-layout-03);
		height: 1rem;
		margin-right: var(--cds-spacing-03);
	}

	.scroll-type__icon--0 {
		background-image: url(../images/upgrade/spellTrace.png);
		width: 33px;
		height: 33px;
		margin-left: 1px;
	}
	.scroll-type__icon--1 {
		background-image: url(../images/upgrade/padScroll.png);
		width: 38px;
		height: 36px;
		margin-top: -1px;
		margin-left: -2px;
	}
	.scroll-type__icon--2 {
		background-image: url(../images/upgrade/chaosScroll.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.scroll-type__icon--3 {
		background-image: url(../images/upgrade/specialScroll.png);
		width: 33px;
		height: 33px;
	}
	.scroll-type__icon--4 {
		background-image: url(../images/upgrade/onlyScroll.png);
		width: 32px;
		height: 29px;
		margin-top: 1px;
	}

	.upgrade__panel {
		display: none;
	}

	.upgrade__panel--open {
		display: block;
	}
</style>
