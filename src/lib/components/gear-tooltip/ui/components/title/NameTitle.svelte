<script lang="ts">
	let {
		name,
		scrollUpgradeCount,
		color
	}: { name: string; scrollUpgradeCount: number; color: string } = $props();
</script>

<div class="gt--title gt--{color}">
	{name}
	{#if scrollUpgradeCount > 0}
		(+{scrollUpgradeCount})
	{/if}
</div>
