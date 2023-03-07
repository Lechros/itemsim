<script lang="ts">
	import type { Gear } from '@malib/gear';

	export let gear: Gear;

	$: maxStar = Math.max(gear.maxStar, gear.star);
	$: lineCount = Math.ceil(maxStar / 15);
	$: stars = getStars(maxStar, gear.star, gear.amazing);

	function getStars(maxStar: number, star: number, amazing: boolean) {
		const color = amazing ? 'blue' : 'yellow';
		return Array.from(Array(maxStar), (_, i) => (i < star ? color : 'empty'));
	}
</script>

{#each { length: lineCount } as _, i}
	<div class="star-line">
		{#each stars.slice(i * 15, (i + 1) * 15) as star}
			<div class={`star ${star}`} />
		{/each}
	</div>
{/each}

<style>
	.star-line {
		display: flex;
		flex-direction: row;
        height: 18px;
	}
    .star-line:last-child {
        height: 16px;
    }

	.star {
		width: 11px;
		height: 10px;
		margin-right: -1px;
	}
	.star:nth-child(5n) {
		margin-right: 5px;
	}
    .star:last-child {
        margin-right: 0px;
    }

	.star.yellow {
		background-image: url(../images/star/yellow.png);
	}
	.star.blue {
		background-image: url(../images/star/blue.png);
	}
	.star.empty {
		background-image: url(../images/star/empty.png);
	}
</style>
