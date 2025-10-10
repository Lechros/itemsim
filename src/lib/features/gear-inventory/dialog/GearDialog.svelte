<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader
	} from '$lib/components/ui/dialog';
	import { ReadonlyGear } from '@malib/gear';
	import { useSetItems } from '$lib/hooks/set-item';
	import { useExclusiveEquips } from '$lib/hooks/exclusive-equip';
	import { createSetItemNameLoader } from '$lib/stores/set-item.svelte';
	import { createExclusiveEquipsLoader } from '$lib/stores/exclusive-equip.svelte';

	let {
		gear,
		open = $bindable(false),
		onAccept,
		onClose
	}: {
		gear: ReadonlyGear;
		open?: boolean;
		onAccept: () => void;
		onClose: () => void;
	} = $props();

	// Load set item and exclusive equip data
	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();
</script>

<Dialog bind:open>
	<DialogContent class="w-fit max-w-none max-h-[calc(100%-2rem)] overflow-y-auto">
		<DialogHeader />

		<div class="flex justify-center">
			<GearTooltip
				{gear}
				incline={{ combat: 0 }}
				loadSetItemName={createSetItemNameLoader(setItems.data)}
				loadExclusiveEquips={createExclusiveEquipsLoader(exclusiveEquips.data)}
			/>
		</div>

		<DialogFooter>
			<Button variant="outline" onclick={onClose}>닫기</Button>
			<Button onclick={onAccept}>강화하기</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
