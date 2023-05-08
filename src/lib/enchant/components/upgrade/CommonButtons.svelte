<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Column, Row } from 'carbon-components-svelte';
	import {
		canArkInnocentScroll,
		canCleanSlateScroll,
		canFailScroll,
		canGoldHammer,
		canInnocentScroll,
		doArkInnocentScroll,
		doCleanSlateScroll,
		doFailScroll,
		doGoldHammer,
		doInnocentScroll
	} from '../../domains/upgrade/common';
	import { resultOrFalse } from '../../domains/util';
	import CommonButton from './CommonButton.svelte';

	export let gear: Gear | undefined;

	$: canHammer = resultOrFalse(canGoldHammer, gear);
	$: canFail = resultOrFalse(canFailScroll, gear);
	$: canCleanSlate = resultOrFalse(canCleanSlateScroll, gear);
	$: canInnocent = resultOrFalse(canInnocentScroll, gear);
	$: canArkInnocent = resultOrFalse(canArkInnocentScroll, gear);

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
</script>

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

<style>
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
		background-image: url(../../images/upgrade/goldenHammer.png);
		width: 30px;
		height: 29px;
		margin-top: 3px;
		margin-left: 3px;
	}
	.common-button__icon--clean-slate {
		background-image: url(../../images/upgrade/cleanSlate.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--fail {
		background-image: url(../../images/upgrade/fail.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--innocent {
		background-image: url(../../images/upgrade/innocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.common-button__icon--ark-innocent {
		background-image: url(../../images/upgrade/arkInnocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
</style>
