<script lang="ts">
	export let incline: number;

	$: inclineString = (incline > 0 ? '+' : '') + incline.toString();
	$: type = incline >= 0 ? 'incline' : 'decline';
	$: small = Math.abs(incline) >= 10_000_000;

	function getLetterName(letter: string): string {
		switch (letter) {
			case '+':
				return 'plus';
			case '-':
				return 'minus';
			default:
				return `number-${letter}`;
		}
	}
</script>

<div class="diff">
	<div class="diff__label gt--text gt--text--gray2">공격력 증가량</div>
	<div class={type} class:small>
		{#each inclineString as letter}
			<div class="letter {getLetterName(letter)}" />
		{/each}
	</div>
</div>

<style>
	.diff {
		display: flex;
		flex-direction: column;
	}

	.diff__label {
		margin-right: 4px;
		text-align: right;
	}

	.incline,
	.decline {
		display: flex;
		flex-direction: row;
		align-self: flex-end;
		align-items: center;
		margin-top: 5px;
	}

	.letter {
		position: relative;
	}

	.small .letter {
		image-rendering: crisp-edges;
		transform-origin: top right;
	}

	.plus {
		width: 18px;
		height: 18px;
		margin-top: 4px;
		margin-right: 5px;
	}
	.small .plus {
		margin-top: 3px;
		margin-right: -1px;
	}
	.minus {
		width: 16px;
		height: 8px;
		margin-top: 9px;
		margin-right: 5px;
	}
	.small .minus {
		margin-top: 8px;
		margin-right: -1px;
	}
	.number-0 {
		width: 19px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-0 {
		width: 18px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(18 / 19), calc(24 / 26));
	}
	.number-1 {
		width: 14px;
		height: 26px;
		margin-left: 4px;
	}
	.small .number-1 {
		width: 13px;
		height: 24px;
		margin-left: 3px;
		transform: scale(calc(13 / 14), calc(24 / 26));
	}
	.number-2 {
		width: 18px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-2 {
		width: 17px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(17 / 18), calc(24 / 26));
	}
	.number-3 {
		width: 17px;
		height: 26px;
		margin-left: 2px;
	}
	.small .number-3 {
		width: 16px;
		height: 24px;
		margin-left: 1px;
		transform: scale(calc(16 / 17), calc(24 / 26));
	}
	.number-4 {
		width: 20px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-4 {
		width: 19px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(19 / 20), calc(24 / 26));
	}
	.number-5 {
		width: 17px;
		height: 26px;
		margin-left: 2px;
	}
	.small .number-5 {
		width: 16px;
		height: 24px;
		margin-left: 1px;
		transform: scale(calc(16 / 17), calc(24 / 26));
	}
	.number-6 {
		width: 18px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-6 {
		width: 17px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(17 / 18), calc(24 / 26));
	}
	.number-7 {
		width: 18px;
		height: 26px;
		margin-left: 2px;
	}
	.small .number-7 {
		width: 17px;
		height: 24px;
		margin-left: 1px;
		transform: scale(calc(17 / 18), calc(24 / 26));
	}
	.number-8 {
		width: 19px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-8 {
		width: 18px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(18 / 19), calc(24 / 26));
	}
	.number-9 {
		width: 19px;
		height: 26px;
		margin-left: 1px;
	}
	.small .number-9 {
		width: 18px;
		height: 24px;
		margin-left: 0px;
		transform: scale(calc(18 / 19), calc(24 / 26));
	}

	.incline .plus {
		background-image: url(../images/summary/incline/plus.png);
	}
	.incline .number-0 {
		background-image: url(../images/summary/incline/0.png);
	}
	.incline .number-1 {
		background-image: url(../images/summary/incline/1.png);
	}
	.incline .number-2 {
		background-image: url(../images/summary/incline/2.png);
	}
	.incline .number-3 {
		background-image: url(../images/summary/incline/3.png);
	}
	.incline .number-4 {
		background-image: url(../images/summary/incline/4.png);
	}
	.incline .number-5 {
		background-image: url(../images/summary/incline/5.png);
	}
	.incline .number-6 {
		background-image: url(../images/summary/incline/6.png);
	}
	.incline .number-7 {
		background-image: url(../images/summary/incline/7.png);
	}
	.incline .number-8 {
		background-image: url(../images/summary/incline/8.png);
	}
	.incline .number-9 {
		background-image: url(../images/summary/incline/9.png);
	}
	.decline .minus {
		background-image: url(../images/summary/decline/minus.png);
	}
	.decline .number-0 {
		background-image: url(../images/summary/decline/0.png);
	}
	.decline .number-1 {
		background-image: url(../images/summary/decline/1.png);
	}
	.decline .number-2 {
		background-image: url(../images/summary/decline/2.png);
	}
	.decline .number-3 {
		background-image: url(../images/summary/decline/3.png);
	}
	.decline .number-4 {
		background-image: url(../images/summary/decline/4.png);
	}
	.decline .number-5 {
		background-image: url(../images/summary/decline/5.png);
	}
	.decline .number-6 {
		background-image: url(../images/summary/decline/6.png);
	}
	.decline .number-7 {
		background-image: url(../images/summary/decline/7.png);
	}
	.decline .number-8 {
		background-image: url(../images/summary/decline/8.png);
	}
	.decline .number-9 {
		background-image: url(../images/summary/decline/9.png);
	}
</style>
