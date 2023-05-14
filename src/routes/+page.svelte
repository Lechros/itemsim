<script lang="ts">
	import CreateGear from '$lib/create-gear/CreateGear.svelte';
	import Enchant from '$lib/enchant/Enchant.svelte';
	import FollowBoundary from '$lib/follow-cursor/FollowBoundary.svelte';
	import FollowCursor from '$lib/follow-cursor/FollowCursor.svelte';
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import ImportGear from '$lib/import-gear/ImportGear.svelte';
	import Inventory from '$lib/inventory/Inventory.svelte';
	import type { Gear } from '@malib/gear';
	import { Button, Column, Grid, Row } from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Upload from 'carbon-icons-svelte/lib/Upload.svelte';
	import { gear, inventory, meta, selected } from '../lib/inventory/stores/gear-store';

	let importOpen = false;

	/* inventory */
	let inventoryComponent: Inventory;

	let deleteIndexes: Set<number> = new Set();

	let inventoryMode: 'default' | 'delete' = 'default';

	let createOpen = false;

	$: gearCount = $inventory.reduce((count, slot) => (slot ? count + 1 : count), 0);

	let inventoryDragging = false;

	/* mouse hover tooltip */
	let hoverGear: Gear | undefined;
</script>

<Grid style="max-width: 40rem; margin-top: 2rem">
	<Row>
		<Column>
			<div class="top-part">
				<div class="top-part__heading">
					<h2>인벤토리</h2>
				</div>
				<div class="top-part__buttons">
					{#if inventoryMode === 'default'}
						<Button
							kind="secondary"
							icon={Upload}
							iconDescription="가져오기"
							on:click={() => (importOpen = true)}
						/>
						<Button icon={Add} on:click={() => (createOpen = true)}>아이템 추가</Button>
						<Button
							kind="danger"
							icon={TrashCan}
							iconDescription="삭제"
							disabled={gearCount === 0}
							on:click={() => (inventoryMode = 'delete')}
						/>
					{:else if inventoryMode === 'delete'}
						<Button
							kind="danger"
							icon={TrashCan}
							disabled={deleteIndexes.size === 0}
							on:click={inventoryComponent.deleteGears}
						>
							아이템 {deleteIndexes.size}개 삭제
						</Button>
						<Button
							kind="secondary"
							icon={Close}
							iconDescription="취소"
							on:click={() => {
								inventoryMode = 'default';
								inventoryComponent.deselectAll;
							}}
						/>
					{/if}
				</div>
			</div>
		</Column>
	</Row>
	<FollowBoundary>
		<Inventory
			bind:mode={inventoryMode}
			bind:deleteIndexes
			bind:hoveringGear={hoverGear}
			bind:dragging={inventoryDragging}
			bind:this={inventoryComponent}
		/>
	</FollowBoundary>
</Grid>

<FollowCursor bound="viewport">
	{#if hoverGear && !inventoryDragging}
		<GearTooltip gear={hoverGear} />
	{/if}
</FollowCursor>

<ImportGear bind:open={importOpen} addGear={inventory.addSlot} />

<CreateGear bind:open={createOpen} addGear={inventory.add} />

<Enchant
	bind:gear={$gear}
	bind:meta={$meta}
	deselectGear={inventory.deselect}
	removeGear={() => inventory.remove($selected)}
	resetMeta={meta.reset}
/>

<style>
	.top-part {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media (max-width: 28rem) {
		.top-part {
			align-items: normal;
			flex-direction: column;
			gap: var(--cds-spacing-03);
		}
	}

	.top-part__buttons {
		display: flex;
		align-self: flex-end;
		gap: var(--cds-spacing-03);
	}
</style>
