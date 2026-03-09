<script lang="ts">
	let { reqLevelDecrease }: { reqLevelDecrease: number } = $props();
</script>

{#if reqLevelDecrease > 0}
	<div class="gt--detail gt--green">착용 레벨 감소 : - {reqLevelDecrease}</div>
{/if}
