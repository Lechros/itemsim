<script lang="ts">
	import { GearPropType, type Gear } from '@malib/gear';

	export let gear: Gear;

	$: reduceReq = Math.min(gear.option(GearPropType.reduceReq).sum, gear.req.level);
	$: reqLevel = gear.req.level - reduceReq;

	$: can = {
		lev: getCanState(reqLevel, 250),
		str: getCanState(gear.req.str, 1000),
		dex: getCanState(gear.req.dex, 1000),
		int: getCanState(gear.req.int, 1000),
		luk: getCanState(gear.req.luk, 1000)
	};

	function getCanState(req: number, value: number): string {
		if (req <= 0) return 'disabled';
		else if (value >= req) return 'can';
		else return 'cannot';
	}
</script>

<ul class="req">
	<li class="req-item req-lev">
		<span class="lev {can.lev}" />
		{#each reqLevel.toString().padStart(3, 'x') as num}
			<span class="number-{num} {can.lev}" class:yellowNumber={can.lev === 'can'} />
		{/each}
		{#if reduceReq > 0}
			<span class="open can" />
			{#each gear.req.level.toString() as num}
				<span class="number-{num} can extra-gap" />
			{/each}
			<span class="minus yellowNumber" />
			{#each reduceReq.toString() as num}
				<span class="number-{num} yellowNumber extra-gap" />
			{/each}
			<span class="close can" />
		{/if}
	</li>
	<li class="req-item">
		<span class="str {can.str}" />
		{#each gear.req.str.toString().padStart(3, '0') as num}
			<span class="number-{num} {can.str}" />
		{/each}
	</li>
	<li class="req-item">
		<span class="luk {can.luk}" />
		{#each gear.req.luk.toString().padStart(3, '0') as num}
			<span class="number-{num} {can.luk}" />
		{/each}
	</li>
	<li class="req-item">
		<span class="dex {can.dex}" />
		{#each gear.req.dex.toString().padStart(3, '0') as num}
			<span class="number-{num} {can.dex}" />
		{/each}
	</li>
	<li class="req-item">
		<span class="int {can.int}" />
		{#each gear.req.int.toString().padStart(3, '0') as num}
			<span class="number-{num} {can.int}" />
		{/each}
	</li>
</ul>

<style>
	.req {
		display: grid;
		padding-left: 3px;
		margin-top: 4px;
		grid-template-rows: 15px 9px 9px;
		grid-template-columns: 80px 74px;
	}

	.req-item {
		display: flex;
		flex-direction: row;
		column-gap: 1px;
	}

	.req-lev {
		grid-column: 1 / 3;
	}

	.lev {
		width: 49px;
		height: 6px;
		margin-right: 4px;
	}
	.str,
	.dex,
	.int,
	.luk {
		width: 50px;
		height: 6px;
		margin-right: 3px;
	}
	.number-0 {
		width: 5px;
		height: 5px;
	}
	.number-1 {
		width: 2px;
		height: 5px;
	}
	.number-1.extra-gap {
		margin-left: 1px;
	}
	.number-2 {
		width: 5px;
		height: 5px;
	}
	.number-3 {
		width: 5px;
		height: 5px;
	}
	.number-4 {
		width: 5px;
		height: 5px;
	}
	.number-5 {
		width: 5px;
		height: 5px;
	}
	.number-6 {
		width: 5px;
		height: 5px;
	}
	.number-7 {
		width: 4px;
		height: 5px;
	}
	.number-8 {
		width: 5px;
		height: 5px;
	}
	.number-9 {
		width: 5px;
		height: 5px;
	}
	.number-x {
		width: 5px;
		height: 5px;
	}
	.open {
		width: 2px;
		height: 5px;
		margin-left: 2px;
	}
	.close {
		width: 2px;
		height: 5px;
	}
	.plus {
		width: 5px;
		height: 5px;
	}
	.minus {
		width: 5px;
		height: 1px;
		margin-top: 2px;
	}

	.can.lev {
		background-image: url(../images/can/reqLEV.png);
	}
	.can.str {
		background-image: url(../images/can/reqSTR.png);
	}
	.can.dex {
		background-image: url(../images/can/reqDEX.png);
	}
	.can.int {
		background-image: url(../images/can/reqINT.png);
	}
	.can.luk {
		background-image: url(../images/can/reqLUK.png);
	}
	.cannot.lev {
		background-image: url(../images/cannot/reqLEV.png);
	}
	.cannot.str {
		background-image: url(../images/cannot/reqSTR.png);
	}
	.cannot.dex {
		background-image: url(../images/cannot/reqDEX.png);
	}
	.cannot.int {
		background-image: url(../images/cannot/reqINT.png);
	}
	.cannot.luk {
		background-image: url(../images/cannot/reqLUK.png);
	}
	.disabled.lev {
		background-image: url(../images/disabled/reqLEV.png);
	}
	.disabled.str {
		background-image: url(../images/disabled/reqSTR.png);
	}
	.disabled.dex {
		background-image: url(../images/disabled/reqDEX.png);
	}
	.disabled.int {
		background-image: url(../images/disabled/reqINT.png);
	}
	.disabled.luk {
		background-image: url(../images/disabled/reqLUK.png);
	}
	.can.number-0 {
		background-image: url(../images/can/0.png);
	}
	.can.number-1 {
		background-image: url(../images/can/1.png);
	}
	.can.number-2 {
		background-image: url(../images/can/2.png);
	}
	.can.number-3 {
		background-image: url(../images/can/3.png);
	}
	.can.number-4 {
		background-image: url(../images/can/4.png);
	}
	.can.number-5 {
		background-image: url(../images/can/5.png);
	}
	.can.number-6 {
		background-image: url(../images/can/6.png);
	}
	.can.number-7 {
		background-image: url(../images/can/7.png);
	}
	.can.number-8 {
		background-image: url(../images/can/8.png);
	}
	.can.number-9 {
		background-image: url(../images/can/9.png);
	}
	.can.open {
		background-image: url(../images/can/open.png);
	}
	.can.close {
		background-image: url(../images/can/close.png);
	}
	.cannot.number-0 {
		background-image: url(../images/cannot/0.png);
	}
	.cannot.number-1 {
		background-image: url(../images/cannot/1.png);
	}
	.cannot.number-2 {
		background-image: url(../images/cannot/2.png);
	}
	.cannot.number-3 {
		background-image: url(../images/cannot/3.png);
	}
	.cannot.number-4 {
		background-image: url(../images/cannot/4.png);
	}
	.cannot.number-5 {
		background-image: url(../images/cannot/5.png);
	}
	.cannot.number-6 {
		background-image: url(../images/cannot/6.png);
	}
	.cannot.number-7 {
		background-image: url(../images/cannot/7.png);
	}
	.cannot.number-8 {
		background-image: url(../images/cannot/8.png);
	}
	.cannot.number-9 {
		background-image: url(../images/cannot/9.png);
	}
	.disabled.number-0 {
		background-image: url(../images/disabled/0.png);
	}
	.disabled.number-1 {
		background-image: url(../images/disabled/1.png);
	}
	.disabled.number-2 {
		background-image: url(../images/disabled/2.png);
	}
	.disabled.number-3 {
		background-image: url(../images/disabled/3.png);
	}
	.disabled.number-4 {
		background-image: url(../images/disabled/4.png);
	}
	.disabled.number-5 {
		background-image: url(../images/disabled/5.png);
	}
	.disabled.number-6 {
		background-image: url(../images/disabled/6.png);
	}
	.disabled.number-7 {
		background-image: url(../images/disabled/7.png);
	}
	.disabled.number-8 {
		background-image: url(../images/disabled/8.png);
	}
	.disabled.number-9 {
		background-image: url(../images/disabled/9.png);
	}
	.yellowNumber.number-0 {
		background-image: url(../images/yellowNumber/0.png);
	}
	.yellowNumber.number-1 {
		background-image: url(../images/yellowNumber/1.png);
	}
	.yellowNumber.number-2 {
		background-image: url(../images/yellowNumber/2.png);
	}
	.yellowNumber.number-3 {
		background-image: url(../images/yellowNumber/3.png);
	}
	.yellowNumber.number-4 {
		background-image: url(../images/yellowNumber/4.png);
	}
	.yellowNumber.number-5 {
		background-image: url(../images/yellowNumber/5.png);
	}
	.yellowNumber.number-6 {
		background-image: url(../images/yellowNumber/6.png);
	}
	.yellowNumber.number-7 {
		background-image: url(../images/yellowNumber/7.png);
	}
	.yellowNumber.number-8 {
		background-image: url(../images/yellowNumber/8.png);
	}
	.yellowNumber.number-9 {
		background-image: url(../images/yellowNumber/9.png);
	}
	.yellowNumber.minus {
		background-image: url(../images/yellowNumber/minus.png);
	}
	.yellowNumber.plus {
		background-image: url(../images/yellowNumber/plus.png);
	}
</style>
