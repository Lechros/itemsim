<script lang="ts">
	import Spacer from '../../Spacer.svelte';
	import Digit from '../Digit.svelte';
	import UIImage from '../../UIImage.svelte';

	let {
		value,
		vary,
		can
	}: {
		value: number;
		vary: number;
		can: boolean;
	} = $props();

	const variant: 'Disabled' | 'Can' | 'Cannot' = $derived(getVariant(value + vary, can));
	const digits = $derived((value + vary).toString().padStart(3, '_'));
	const baseDigits = $derived(value.toString());
	const varyDigits = $derived(vary.toString());

	function getVariant(value: number, can: boolean) {
		if (value === 0) {
			return 'Disabled';
		}
		return can ? 'Can' : 'Cannot';
	}
</script>

<div class="flex items-start gap-px">
	<UIImage
		image={`number${variant}ReqLev` as 'numberCanReqLev'}
		style="margin-right: {variant === 'Can' ? '4px' : '3px'}"
	/>
	{#each digits.split('') as digit}
		{#if digit === '_'}
			<Spacer width={5} />
		{:else}
			<Digit {digit} variant={variant === 'Can' ? 'Yellow' : variant} />
		{/if}
	{/each}
	{#if vary != 0}
		<Spacer width={1} />
		<UIImage image="numberCanOpen" />
		{#each baseDigits.split('') as digit}
			<Digit {digit} variant="Can" allowGap />
		{/each}
		{#if vary > 0}
			<UIImage image="numberYellowPlus" />
		{:else if vary < 0}
			<UIImage image="numberYellowMinus" style="margin-top: 2px" />
		{/if}
		{#each varyDigits.split('') as digit}
			<Digit {digit} variant="Yellow" allowGap />
		{/each}
		<UIImage image="numberCanClose" />
	{/if}
</div>
