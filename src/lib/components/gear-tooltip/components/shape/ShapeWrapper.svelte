<script lang="ts">
	import type { GearShapeData } from '@malib/gear';
	import type { Snippet } from 'svelte';

	let {
		children,
		before,
		shape
	}: {
		children: Snippet;
		before?: Snippet;
		shape?: GearShapeData;
	} = $props();
</script>

{#if shape}
	{@render before?.()}
	<div class="flex flex-col items-start self-start pr-[13px] pl-[13px]">
		{@render children()}
	</div>
{/if}
