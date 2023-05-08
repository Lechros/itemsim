<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import {
		canAmazingEnhancement,
		canEnhance,
		canResetEnhancement,
		canStarforce,
		canStarforce17,
		canStarforce22,
		canStarforceReduce,
		doAmazingEnhancement,
		doResetEnhancement,
		doStarforce,
		doStarforce17,
		doStarforce22,
		doStarforceReduce
	} from '../domains/enhance';
	import { resultOrFalse } from '../domains/util';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canEnhance, gear);

	$: canStar = resultOrFalse(canStarforce, gear);
	$: canStarReduce = resultOrFalse(canStarforceReduce, gear);
	$: canStar17 = resultOrFalse(canStarforce17, gear);
	$: canStar22 = resultOrFalse(canStarforce22, gear);
	$: canAmazing = resultOrFalse(canAmazingEnhancement, gear);
	$: canReset = resultOrFalse(canResetEnhancement, gear);

	function starforce() {
		if (!gear) return;
		gear = doStarforce(gear);
	}

	function starforceReduce() {
		if (!gear) return;
		gear = doStarforceReduce(gear);
	}

	function starforce17() {
		if (!gear) return;
		gear = doStarforce17(gear);
	}

	function starforce22() {
		if (!gear) return;
		gear = doStarforce22(gear);
	}

	function amazing() {
		if (!gear) return;
		gear = doAmazingEnhancement(gear);
	}

	function reset() {
		if (!gear) return;
		gear = doResetEnhancement(gear);
	}
</script>

<div class="enhance">
	{#if can && gear}
		<Row>
			<Column>
				<div class="enhance__button-contents">
					<Button kind="secondary" on:click={starforce} disabled={!canStar}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--starforce" />
							스타포스
						</div>
					</Button>
					<Button kind="secondary" on:click={starforceReduce} disabled={!canStarReduce}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--starforce enhance__icon--starforce-down" />
							스타포스 감소
						</div>
					</Button>
					<Button kind="secondary" on:click={starforce17} disabled={!canStar17}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--starforce-17" />
							스타포스 17성
						</div>
					</Button>
					<Button kind="secondary" on:click={starforce22} disabled={!canStar22}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--starforce-22" />
							스타포스 22성
						</div>
					</Button>
					<Button kind="secondary" on:click={amazing} disabled={!canAmazing}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--amazing" />
							놀라운 장비 강화
						</div>
					</Button>
					<Button kind="secondary" on:click={reset} disabled={!canReset}>
						<div class="enhance__button-content">
							<div class="enhance__icon enhance__icon--reset" />
							스타포스 초기화
						</div>
					</Button>
				</div>
			</Column>
		</Row>
	{:else}
		<div class="enhance__cannot">강화 불가</div>
	{/if}
</div>

<style>
	.enhance {
		margin-top: var(--cds-spacing-05);
	}

	.enhance__button-contents {
		display: flex;
		flex-direction: column;
	}

	.enhance__button-content {
		display: flex;
		align-items: center;
		gap: var(--cds-spacing-05);
	}

	.enhance__icon.enhance__icon--starforce {
		background-image: url(../images/enhance/starforce.png);
		width: 32px;
		height: 31px;
	}
	.enhance__icon.enhance__icon--starforce.enhance__icon--starforce-down {
		filter: grayscale(1) brightness(0.8);
	}
	.enhance__icon.enhance__icon--starforce-17 {
		background-image: url(../images/enhance/starforce17.png);
		width: 32px;
		height: 31px;
		margin-top: 2px;
		margin-left: 1px;
	}
	.enhance__icon.enhance__icon--starforce-22 {
		background-image: url(../images/enhance/starforce22.png);
		width: 35px;
		height: 34px;
		margin-top: -1px;
		margin-left: -1px;
	}
	.enhance__icon.enhance__icon--amazing {
		background-image: url(../images/enhance/amazing.png);
		width: 34px;
		height: 35px;
	}
	.enhance__icon.enhance__icon--reset {
		background-image: url(../images/enhance/reset.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	* *[disabled] .enhance__icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
	}
</style>