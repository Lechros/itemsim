<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';

	let {
		star,
		maxStar,
		color
	}: {
		star: number;
		maxStar: number;
		color: 'yellow' | 'blue';
	} = $props();

	const STAR_PER_LINE = 15;
	const STAR_PER_GROUP = 5;

	const lines = $derived(toStarArray(star, maxStar));

	function toStarArray(star: number, maxStar: number) {
		maxStar = Math.max(star, maxStar);
		const lines = [];
		for (let l = 0; l < maxStar; l += STAR_PER_LINE) {
			const line = [];
			for (let g = l; g < Math.min(maxStar, l + STAR_PER_LINE); g += STAR_PER_GROUP) {
				const group = [];
				for (let s = g; s < Math.min(maxStar, g + STAR_PER_GROUP); s++) {
					group.push(s < star);
				}
				line.push(group);
			}
			lines.push(line);
		}
		return lines;
	}
</script>

{#if lines}
	<div class="mx-auto flex flex-col items-center gap-y-[8px]">
		{#each lines as line}
			<div class="flex gap-x-[10px]">
				{#each line as group}
					<div class="flex">
						{#each group as isFilled}
							{@render starIcon(color, !isFilled)}
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}

{#snippet starIcon(color: 'yellow' | 'blue', isEmpty: boolean)}
	{#if isEmpty}
		<UIImage2 image="emptyStar" />
	{:else if color === 'yellow'}
		<UIImage2 image="star" />
	{:else}
		<UIImage2 image="blueStar" />
	{/if}
{/snippet}
