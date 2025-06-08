<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import { tokenizeColorString } from '../../../model/parser';
	import FontTextChar from './FontTextChar.svelte';

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
			<FontTextChar
				charCode={char.charCodeAt(0)}
				colorCode={getColorCode(token.color ?? 'white')}
			/>
		{/each}
	{/each}
</div>
