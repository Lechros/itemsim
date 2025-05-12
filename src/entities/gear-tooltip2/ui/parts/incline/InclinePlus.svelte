<script lang="ts">
	import { splitKoreanNumber } from '$lib/entities/gear-tooltip2/model/digit';
	import type { tooltip2Images } from '$lib/shared/assets';
	import { UIImage2 } from '$lib/shared/ui';

	let { incline }: { incline: number } = $props();

	const digits = $derived(splitKoreanNumber(incline));
	const unitCount = $derived(digits.filter((digit) => digit === '만' || digit === '억').length);
</script>

<div class="flex gap-[2px]" style="margin-right: -{unitCount * 4}px;">
	<UIImage2 image="inclinePlus_sign" class="mr-[5px]" />
	{#each digits as digit}
		{@render image(digit)}
	{/each}
</div>

{#snippet image(digit: string)}
	{#if digit === '만'}
		<UIImage2 image="inclinePlus_a" class="mr-[4px]" />
	{:else if digit === '억'}
		<UIImage2 image="inclinePlus_b" class="mr-[4px]" />
	{:else}
		<UIImage2 image={`inclinePlus_${digit}` as keyof typeof tooltip2Images} />
	{/if}
{/snippet}
