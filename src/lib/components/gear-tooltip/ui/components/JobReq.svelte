<script lang="ts">
	import { UIImage } from '$lib/shared/ui';

	let {
		reqJob,
		can,
		message
	}: {
		reqJob: number;
		can: boolean;
		message?: string;
	} = $props();
</script>

{#if message}
	<UIImage image="jobExpand" class="flex flex-col items-center">
		{@render content()}
		<div class="gt--detail gt--orange2 mt-[5px] pr-px">
			{message}
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
		{#each [1, 2, 3, 4, 5] as const as index}
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
