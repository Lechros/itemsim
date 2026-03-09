<script lang="ts">
	import { PotentialGrade } from '@malib/gear';
	import type { Snippet } from 'svelte';

	let {
		children,
		before,
		grade
	}: {
		children: Snippet;
		before?: Snippet;
		grade: PotentialGrade;
	} = $props();
</script>

{#if grade !== PotentialGrade.Normal}
	{@render before?.()}
	<div class="flex flex-col items-start self-start pl-[13px]">
		{@render children()}
	</div>
{/if}
