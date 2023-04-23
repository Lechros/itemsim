<script lang="ts">
	export let pddDiff: number = 0;
	export let bdrDiff: number = 0;
	export let imdrDiff: number = 0;

	function diffToString(diff: number): string {
		const abs = Math.abs(diff);
		if (diff > 0) {
			return `+ ${abs}`;
		} else if (diff < 0) {
			return `- ${abs}`;
		} else {
			return `${abs}`;
		}
	}

	function getLetterName(letter: string): string {
		switch (letter) {
			case ' ':
				return 'none';
			case '+':
				return 'plus';
			case '-':
				return 'minus';
			default:
				return `number-${letter}`;
		}
	}
</script>

<div class="diff-extra">
	<div class="diff-extra__item">
		<span class="pdd" />
		<span class="diff-extra__value">
			{#each diffToString(pddDiff) as letter}
				<span class={getLetterName(letter)} />
			{/each}
		</span>
	</div>
	<div class="diff-extra__item">
		<span class="bdr" />
		<span class="diff-extra__value">
			{#each diffToString(bdrDiff) as letter}
				<span class={getLetterName(letter)} />
			{/each}
			<span class="percent" />
		</span>
	</div>
	<div class="diff-extra__item">
		<span class="imdr" />
		<span class="diff-extra__value">
			{#each diffToString(imdrDiff) as letter}
				<span class={getLetterName(letter)} />
			{/each}
			<span class="percent" />
		</span>
	</div>
</div>

<style>
	.diff-extra {
		display: grid;
		grid-template-columns: 62px 62px 58px;
	}

	.diff-extra__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.diff-extra__value {
		display: flex;
		margin-right: 5px;
		column-gap: 1px;
	}

	.pdd {
		background-image: url(../images/summary/icon/pdd.png);
		width: 17px;
		height: 17px;
	}
	.bdr {
		background-image: url(../images/summary/icon/bdr.png);
		width: 17px;
		height: 17px;
	}
	.imdr {
		background-image: url(../images/summary/icon/igpddr.png);
		width: 16px;
		height: 16px;
	}

	.none {
		width: 2px;
		height: 5px;
	}
	.plus {
		background-image: url(../images/lookahead/plus.png);
		width: 5px;
		height: 5px;
	}
	.minus {
		background-image: url(../images/lookahead/minus.png);
		width: 5px;
		height: 1px;
		margin-top: 2px;
	}
	.percent {
		background-image: url(../images/lookahead/percent.png);
		width: 5px;
		height: 5px;
		margin-left: 3px;
	}
	.number-0 {
		background-image: url(../images/lookahead/0.png);
		width: 5px;
		height: 5px;
	}
	.number-1 {
		background-image: url(../images/lookahead/1.png);
		width: 2px;
		height: 5px;
	}
	.number-2 {
		background-image: url(../images/lookahead/2.png);
		width: 5px;
		height: 5px;
	}
	.number-3 {
		background-image: url(../images/lookahead/3.png);
		width: 5px;
		height: 5px;
	}
	.number-4 {
		background-image: url(../images/lookahead/4.png);
		width: 5px;
		height: 5px;
	}
	.number-5 {
		background-image: url(../images/lookahead/5.png);
		width: 5px;
		height: 5px;
	}
	.number-6 {
		background-image: url(../images/lookahead/6.png);
		width: 5px;
		height: 5px;
	}
	.number-7 {
		background-image: url(../images/lookahead/7.png);
		width: 4px;
		height: 5px;
	}
	.number-8 {
		background-image: url(../images/lookahead/8.png);
		width: 5px;
		height: 5px;
	}
	.number-9 {
		background-image: url(../images/lookahead/9.png);
		width: 5px;
		height: 5px;
	}
</style>
