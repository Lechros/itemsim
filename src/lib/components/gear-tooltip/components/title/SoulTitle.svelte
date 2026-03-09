<script lang="ts">
	let { soulName }: { soulName: string | undefined } = $props();
</script>

{#if soulName}
	<div class="gt--title gt--green">{soulName.replace(/소울$/, '')}</div>
{/if}
