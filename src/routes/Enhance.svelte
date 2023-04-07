<script lang="ts">
	import {
		GearPropType,
		addAmazingEnhancement,
		addStarforce,
		resetEnhancement,
		type Gear
	} from '@malib/gear';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import { gear } from './gear-store';

	$: canStar = $gear.maxStar > $gear.star;
	$: canStarDown = !$gear.amazing && $gear.star > 0;
	$: canStar17 = $gear.star < 17 && $gear.maxStar >= 17;
	$: canStar22 = $gear.star < 22 && $gear.maxStar >= 22;
	$: canAmazing =
		$gear.req.level <= 150 && !$gear.getBooleanValue(GearPropType.superiorEqp) && 15 > $gear.star;
	$: canReset = $gear.star > 0;

	function starforce() {
		addStarforce($gear);

		gear.set($gear);
	}

	function starforceDown() {
		if ($gear.amazing) return;

		const count = $gear.star - 1;
		resetEnhancement($gear);
		for (let i = 0; i < count; i++) {
			addStarforce($gear);
		}
		gear.set($gear);
	}

	function starforce17() {
		const count = 17 - $gear.star;
		for (let i = 0; i < count; i++) {
			addStarforce($gear);
		}
		gear.set($gear);
	}

	function starforce22() {
		const count = 22 - $gear.star;
		for (let i = 0; i < count; i++) {
			addStarforce($gear);
		}
		gear.set($gear);
	}

	function amazing() {
		addAmazingEnhancement($gear);
		gear.set($gear);
	}

	function reset() {
		resetEnhancement($gear);
		gear.set($gear);
	}

	function canEnhance(gear: Gear) {
		return gear.maxStar > 0;
	}
</script>

{#if $gear && canEnhance($gear)}
	<Row>
		<Column>
			<div class="enhance">
				<Button kind="secondary" on:click={starforce} disabled={!canStar}>
					<div class="wrapper">
						<div class="starforce icon" />
						스타포스
					</div>
				</Button>
				<Button kind="secondary" on:click={starforceDown} disabled={!canStarDown}>
					<div class="wrapper">
						<div class="starforce down icon" />
						스타포스 감소
					</div>
				</Button>
				<Button kind="secondary" on:click={starforce17} disabled={!canStar17}>
					<div class="wrapper">
						<div class="starforce-17 icon" />
						스타포스 17성
					</div>
				</Button>
				<Button kind="secondary" on:click={starforce22} disabled={!canStar22}>
					<div class="wrapper">
						<div class="starforce-22 icon" />
						스타포스 22성
					</div>
				</Button>
				<Button kind="secondary" on:click={amazing} disabled={!canAmazing}>
					<div class="wrapper">
						<div class="amazing icon" />
						놀라운 장비 강화
					</div>
				</Button>
				<Button kind="secondary" on:click={reset} disabled={!canReset}>
					<div class="wrapper">
						<div class="reset icon" />
						스타포스 초기화
					</div>
				</Button>
			</div>
		</Column>
	</Row>
{:else}
	강화 불가
{/if}

<style>
	.enhance {
		display: flex;
		flex-direction: column;
		margin-top: var(--cds-spacing-05);
	}

	.wrapper {
		display: flex;
		align-items: center;
		gap: var(--cds-spacing-03);
	}

	.starforce.down.icon {
		filter: grayscale(1) brightness(0.8);
	}

	.starforce.icon {
		background-image: url(../images/starforce.png);
		width: 32px;
		height: 31px;
	}
	.starforce-17.icon {
		background-image: url(../images/star17.png);
		width: 32px;
		height: 31px;
		margin-top: 2px;
		margin-left: 1px;
	}
	.starforce-22.icon {
		background-image: url(../images/star22.png);
		width: 35px;
		height: 34px;
		margin-top: -1px;
		margin-left: -1px;
	}
	.amazing.icon {
		background-image: url(../images/amazing.png);
		width: 34px;
		height: 35px;
	}
	.reset.icon {
		background-image: url(../images/innocent.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}

	* *[disabled] .icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
	}
</style>
