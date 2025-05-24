<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import { useGearQuery } from '$lib/features/gear-inventory/model/inventory-store';
	import GearInventoryItem from '$lib/features/gear-inventory/ui/GearInventoryItem.svelte';
	import GearInventoryList from '$lib/features/gear-inventory/ui/GearInventoryList.svelte';
	import { ReadonlyGear } from '@malib/gear';

	const rows = useGearQuery();

	let hoverIndex = $state(-1);

	let mouseX = $state(0);
	let mouseY = $state(0);

	let tooltipElement: HTMLDivElement | null = $state(null);

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	let windowWidth = $state(0);
	let windowHeight = $state(0);

	let tooltipWidth = $state(0);
	let tooltipHeight = $state(0);

	let tooltipX = $derived(Math.max(0, Math.min(mouseX, windowWidth - tooltipWidth)));
	let tooltipY = $derived(Math.max(0, Math.min(mouseY, windowHeight - tooltipHeight)));

	$effect(() => {
		if (tooltipElement) {
			tooltipWidth = tooltipElement.clientWidth;
			tooltipHeight = tooltipElement.clientHeight;
		}
	});
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
/>

<div class="mx-auto max-w-[848px]">
	<GearInventoryList>
		{#each $rows as row, index}
			<GearInventoryItem
				gearData={row.gear}
				scale={2}
				href="/gear/{row.seq}"
				onmouseenter={() => (hoverIndex = index)}
				onmouseleave={() => (hoverIndex = -1)}
			/>
		{/each}
	</GearInventoryList>
</div>

{#if hoverIndex !== -1}
	<div
		class="pointer-events-none fixed"
		style="left: {tooltipX}px; top: {tooltipY}px;"
		bind:this={tooltipElement}
	>
		<GearTooltip
			gear={new ReadonlyGear($rows[hoverIndex].gear)}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</div>
{/if}
