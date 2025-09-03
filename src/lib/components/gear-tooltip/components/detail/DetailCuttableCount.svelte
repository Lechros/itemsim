<script lang="ts">
	let { cuttableCount }: { cuttableCount: number | undefined } = $props();
</script>

{#if cuttableCount !== undefined}
	<div class="gt--detail gt--orange2">가위 사용 가능 횟수: {cuttableCount}회</div>
{/if}
