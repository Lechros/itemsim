<script lang="ts">
	import Digit from '../Digit.svelte';
	import UIImage from '../../UIImage.svelte';

	let {
		type,
		value,
		percent = false
	}: {
		type: 'pdd' | 'bdr' | 'igpddr';
		value: number;
		percent?: boolean;
	} = $props();

	const typePascalCase = $derived(getTypePascalCase(type));
	const digits = $derived(Math.abs(value).toString());

	function getTypePascalCase(type: 'pdd' | 'bdr' | 'igpddr') {
		switch (type) {
			case 'pdd':
				return 'Pdd';
			case 'bdr':
				return 'Bdr';
			case 'igpddr':
				return 'Igpddr';
			default:
				throw new Error(`Invalid type: ${type}`);
		}
	}
</script>

<div class="flex items-center justify-between">
	<UIImage image={`summaryIcon${typePascalCase}` as 'summaryIconPdd'} />
	<div class="flex gap-px">
		{#if value > 0}
			<UIImage image="numberLookaheadPlus" class="mt-0.5 mr-[3px]" />
		{:else if value < 0}
			<UIImage image="numberLookaheadMinus" class="mr-[3px]" />
		{/if}
		{#each digits.split('') as digit}
			<Digit {digit} variant="Lookahead" />
		{/each}
		{#if percent}
			<UIImage image="numberLookaheadPercent" class="ml-[3px]" />
		{/if}
	</div>
</div>
