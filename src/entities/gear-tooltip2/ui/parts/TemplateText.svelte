<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import { tokenizeColorString } from '../../model/parser';
	import NewTextChar from './NewTextChar.svelte';

	let {
		raw,
		class: className
	}: {
		raw: string;
		class?: string;
	} = $props();

	const tokens = $derived(
		tokenizeColorString(raw, {
			c: 'emphasis',
			$r: 'red',
			$g: 'gray',
			$b: 'bonusStat',
			$u: 'scroll',
			$s: 'starforce'
		})
	);

	function getColorCode(color: string) {
		switch (color) {
			case 'white':
				return '#ffffff';
			case 'gray':
				return '#b7bfc5';
			case 'darkGray':
				return '#85919f';
			case 'red':
				return '#ff6633';
			case 'emphasis':
				return '#ffcc00';
			case 'starforce':
				return '#ffcc00';
			case 'scroll':
				return '#afadff';
			case 'bonusStat':
				return '#0ae3ad';
			case 'potentialNormal':
				return '#85919f';
			case 'potentialRare':
				return '#66ffff';
			case 'potentialEpic':
				return '#bb77ff';
			case 'potentialUnique':
				return '#ffcc00';
			case 'potentialLegendary':
				return '#ccff00';
			case 'exceptional':
				return '#ff3333';
			default:
				return '#ffffff';
		}
	}
</script>

<div class={cn('flex flex-wrap', className)}>
	{#each tokens as token}
		{#each token.text as char}
			<NewTextChar charCode={char.charCodeAt(0)} color={getColorCode(token.color ?? 'white')} />
		{/each}
	{/each}
</div>

<style>
	.text {
		white-space: pre-wrap;
		font-family: 'Morris';
		font-size: 12px;
		line-height: 16px;
		color: #ffffff;
	}
	.text :global(.emphasis) {
		color: #ffcc00;
	}
	.text :global(.red) {
		color: #ff6633;
	}
	.text :global(.gray) {
		color: #b7bfc5;
	}
	.text :global(.starforce) {
		color: #ffcc00;
	}
	.text :global(.scroll) {
		color: #afadff;
	}
	.text :global(.bonusStat) {
		color: #0ae3ad;
	}
</style>
