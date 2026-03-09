<script lang="ts">
	import UIImage from './UIImage.svelte';

	let {
		reqJob,
		can,
		jobNames
	}: {
		reqJob: number;
		can: boolean;
		jobNames?: string[];
	} = $props();
</script>

{#if jobNames && jobNames.length > 0}
	<UIImage image="jobExpand" class="flex flex-col items-center">
		{@render content()}
		<div class="gt--detail gt--orange2 mt-[5px] max-w-[200px] pr-px text-center">
			{jobNames.join(', ')} 착용 가능
		</div>
	</UIImage>
{:else}
	<UIImage image="jobNormal" class="flex flex-col items-center">
		{@render content()}
	</UIImage>
{/if}

{#snippet content()}
	<div class="flex gap-[14px] pt-[7px]">
		{@render jobClass(0, reqJob === 0)}
		{#each [1, 2, 3, 4, 5] as const as index (index)}
			{@render jobClass(index, reqJob === 0 || (reqJob & (1 << (index - 1))) !== 0)}
		{/each}
	</div>
{/snippet}

{#snippet jobClass(index: 0 | 1 | 2 | 3 | 4 | 5, enabled: boolean)}
	<UIImage
		image={`job${can ? 'Enable' : 'Disable'}${index}` as 'jobEnable0'}
		class={[!enabled && 'invisible']}
	/>
{/snippet}
