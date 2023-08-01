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
			<CommonButton on:click={hammer} disabled={!canHammer} iconId={2470000}>
				황금 망치
			</CommonButton>
			<CommonButton on:click={fail} disabled={!canFail} iconId={2041226}>
				주문서 실패
			</CommonButton>
			<CommonButton on:click={cleanSlate} disabled={!canCleanSlate} iconId={2049000}>
				순백의 주문서
			</CommonButton>
			<CommonButton on:click={innocent} disabled={!canInnocent} iconId={2049600}>
				이노센트
			</CommonButton>
			<CommonButton on:click={arkInnocent} disabled={!canArkInnocent} iconId={2049628}>
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
</style>
