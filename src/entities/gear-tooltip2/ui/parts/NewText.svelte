<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import NewTextChar from './NewTextChar.svelte';
	import Text from './Text.svelte';

	let {
		value,
		variant = 'default',
		color = 'white',
		class: className,
		style,
		tag = 'div',
		alignFirstLetter = true
	}: {
		value?: string;
		variant?: 'default' | 'itemName' | 'normal';
		color?:
			| 'white'
			| 'gray'
			| 'darkGray'
			| 'red'
			| 'emphasis'
			| 'starforce'
			| 'scroll'
			| 'bonusStat'
			| 'potentialNormal'
			| 'potentialRare'
			| 'potentialEpic'
			| 'potentialUnique'
			| 'potentialLegendary'
			| 'exceptional';
		class?: string;
		style?: string;
		tag?: string;
		alignFirstLetter?: boolean;
	} = $props();

	const isFirstLetterAlphabet = $derived(value?.[0]?.match(/[a-zA-Z]/));

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

{#if variant === 'default'}
	<svelte:element
		this={tag}
		class={cn(
			'text flex flex-wrap',
			alignFirstLetter && isFirstLetterAlphabet && 'pl-[1px]',
			className
		)}
		{style}
	>
		{#if value}
			{#each value as char}
				<NewTextChar charCode={char.charCodeAt(0)} color={getColorCode(color)} />
			{/each}
		{/if}
	</svelte:element>
{:else}
	<Text {variant} {color} class={className} {style} {tag}>
		{value}
	</Text>
{/if}
