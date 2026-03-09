<script lang="ts">
	let { superior }: { superior: boolean } = $props();
</script>

{#if superior}
	<div class="gt--detail gt--green self-center">슈페리얼</div>
{/if}
