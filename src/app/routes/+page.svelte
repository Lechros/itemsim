<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import { useGearQuery } from '$lib/features/gear-inventory/model/inventory-store';
	import GearInventoryItem from '$lib/features/gear-inventory/ui/GearInventoryItem.svelte';
	import GearInventoryList from '$lib/features/gear-inventory/ui/GearInventoryList.svelte';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import FollowCursor from '$lib/shared/ui/FollowCursor.svelte';
	import { ReadonlyGear } from '@malib/gear';
	import { Loader2, Plus } from 'lucide-svelte';

	const rows = useGearQuery();

	let hoverIndex = $state(-1);
</script>

<div class="mx-auto flex min-h-screen flex-col">
	<main class="flex-grow">
		<div class="mx-auto max-w-[848px] space-y-4">
			<div class="flex justify-end">
				<Button href="/gear/search">아이템 추가</Button>
			</div>
			{#if $rows}
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
			{:else}
				<div class="flex h-64 items-center justify-center">
					<Loader2 class="size-12 animate-spin" />
				</div>
			{/if}
		</div>
	</main>
</div>

{#if hoverIndex !== -1}
	<FollowCursor>
		<GearTooltip
			gear={new ReadonlyGear($rows[hoverIndex].gear)}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</FollowCursor>
{/if}
