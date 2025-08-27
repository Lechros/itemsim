<script lang="ts">
	let { name }: { name?: string } = $props();
</script>

{#if name}
	<div class="gt--soul gt--yellow">{name} 적용</div>
{/if}
