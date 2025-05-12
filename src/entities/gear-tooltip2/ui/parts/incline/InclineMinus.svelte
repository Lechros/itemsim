<script lang="ts">
	import { splitKoreanNumber } from '$lib/entities/gear-tooltip2/model/digit';
	import type { tooltip2Images } from '$lib/shared/assets';
	import { UIImage2 } from '$lib/shared/ui';

	let {
		incline,
		class: className
	}: {
		incline: number;
		class?: string;
	} = $props();

	const digits = $derived(splitKoreanNumber(Math.abs(incline)));
</script>

<div class={['flex gap-[2px]', className]}>
	<UIImage2 image="inclineMinus_sign" class="mr-[5px]" />
	{#each digits as digit}
		{@render image(digit)}
	{/each}
</div>

{#snippet image(digit: string)}
	{#if digit === '만'}
		<UIImage2 image="inclineMinus_a" class="mr-[4px]" />
	{:else if digit === '억'}
		<UIImage2 image="inclineMinus_b" class="mr-[4px]" />
	{:else}
		<UIImage2 image={`inclineMinus_${digit}` as keyof typeof tooltip2Images} />
	{/if}
{/snippet}
