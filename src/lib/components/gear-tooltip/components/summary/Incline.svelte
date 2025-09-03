<script lang="ts">
	import UIImage from '../UIImage.svelte';

	let { label, diff, small = false }: { label: string; diff: number; small?: boolean } = $props();

	type Size = '' | '_10digit' | '_8digit';

	const sign = $derived(diff > 0 ? '+' : diff < 0 ? '-' : null);
	const digits = $derived(Math.abs(diff).toString());
	const size = $derived(getSize(small, digits));

	function getSize(small: boolean, digits: string): Size {
		if (small) {
			return '_8digit';
		}
		if (digits.length > 9) {
			return '_8digit';
		} else if (digits.length > 7) {
			return '_10digit';
		} else {
			return '';
		}
	}

	const digitMargins = {
		'': [1, 4, 1, 2, 1, 2, 1, 2, 1, 1],
		_10digit: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		_8digit: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0]
	};
</script>

<div
	class={[
		'flex flex-col items-end',
		{
			'mb-[5px] gap-[4px]': size === '',
			'mb-[8px] gap-[4px]': size === '_10digit',
			'mb-[7px] gap-[2px]': size === '_8digit'
		}
	]}
>
	<div class="gt--detail gt--gray2 whitespace-pre">{label}{' '}</div>
	<div class={['flex items-center justify-end', { '-mr-0.5': size === '_10digit' }]}>
		{#if sign}
			{@render signImage(sign, size)}
		{/if}
		{#each digits.split('') as digit}
			{@render digitImage(digit, size, diff < 0)}
		{/each}
	</div>
</div>

{#snippet signImage(sign: '+' | '-', size: Size)}
	<UIImage
		image={((sign === '+' ? `inclinePlus` : 'declineMinus') + size) as 'inclinePlus'}
		class={[{ 'mr-1': size === '' }]}
	/>
{/snippet}

{#snippet digitImage(digit: string, size: Size, isDecline: boolean)}
	<UIImage
		image={((isDecline ? 'decline' : 'incline') + digit + size) as 'incline0'}
		style="margin-left: {digitMargins[size][Number(digit)]}px"
	/>
{/snippet}
