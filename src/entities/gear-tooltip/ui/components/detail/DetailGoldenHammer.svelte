<script lang="ts">
	let { goldenHammer }: { goldenHammer: number } = $props();
</script>

{#if goldenHammer > 0}
	<div class="gt--detail gt--white">황금망치 제련 적용</div>
{/if}
