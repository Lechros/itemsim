<script lang="ts">
	import {
		addAmazingEnhancement,
		addStarforce,
		GearPropType,
		resetEnhancement,
		type Gear
	} from '@malib/gear';
	import { gear } from './gear-store';

	$: canStar = $gear.maxStar > $gear.star;
	$: canStar17 = $gear.star < 17 && $gear.maxStar >= 17;
	$: canStar22 = $gear.star < 22 && $gear.maxStar >= 22;
	$: canAmazing =
		$gear.req.level <= 150 && !$gear.getBooleanValue(GearPropType.superiorEqp) && canStar;
	$: canReset = $gear.star > 0;

	function starforce() {
		addStarforce($gear);

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
	<div class="enhance">
		<button on:click={starforce} disabled={!canStar}>
			<div class="starforce icon" />
			스타포스
		</button>
		<button on:click={starforce17} disabled={!canStar17}>
			<div class="starforce-17 icon" />
			스타포스 17성
		</button>
		<button on:click={starforce22} disabled={!canStar22}>
			<div class="starforce-22 icon" />
			스타포스 22성
		</button>
		<button on:click={amazing} disabled={!canAmazing}>
			<div class="amazing icon" />
			놀라운 장비 강화
		</button>
		<button on:click={reset} disabled={!canReset}>
			<div class="reset icon" />
			스타포스 초기화
		</button>
	</div>
{:else}
	강화 불가
{/if}

<style>
	.enhance {
		display: grid;
		grid-template-columns: repeat(5, 5em);
		grid-template-rows: 5em;
		gap: 0.5rem;
	}

	.enhance button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 0.5rem;
	}

	button:disabled .icon {
		filter: grayscale(1) contrast(0.5) brightness(1.3);
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
	}
	.starforce-22.icon {
		background-image: url(../images/star22.png);
		width: 35px;
		height: 34px;
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
	}
</style>
