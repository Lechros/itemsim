<script lang="ts">
	import CreateGearModal from '$lib/create-gear/CreateGearModal.svelte';
	import EnchantModal from '$lib/enchant/EnchantModal.svelte';
	import FollowBoundary from '$lib/follow-cursor/FollowBoundary.svelte';
	import FollowCursor from '$lib/follow-cursor/FollowCursor.svelte';
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import ImportGearModal from '$lib/import-gear/ImportGearModal.svelte';
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

	let selectedIndexes: Set<number> = new Set();

	let inventoryMode: 'default' | 'delete' = 'default';

	let createOpen = false;

	$: gearCount = $inventory.reduce((count, info) => (info ? count + 1 : count), 0);

	let inventoryDragging = false;

	/* mouse hover tooltip */
	let hoveringGear: Gear | undefined;
</script>

<div class="container">
	<Grid>
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
								disabled={selectedIndexes.size === 0}
								on:click={inventoryComponent.deleteGears}
							>
								아이템 {selectedIndexes.size}개 삭제
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
				bind:selectedIndexes
				bind:hoveringGear
				bind:isDragging={inventoryDragging}
				bind:this={inventoryComponent}
			/>
		</FollowBoundary>
	</Grid>
</div>

<FollowCursor bound="viewport">
	{#if hoveringGear && !inventoryDragging}
		<GearTooltip gear={hoveringGear} />
	{/if}
</FollowCursor>

<ImportGearModal bind:open={importOpen} addGear={inventory.add} />

<CreateGearModal bind:open={createOpen} addGear={inventory.addGear} />

<EnchantModal
	bind:gear={$gear}
	bind:meta={$meta}
	deselectGear={inventory.deselect}
	removeGear={() => inventory.remove($selected)}
	resetMeta={meta.reset}
/>

<style>
	.container {
		margin: 0 auto;
		padding-top: var(--cds-spacing-05);
		max-width: 40rem;
	}

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
