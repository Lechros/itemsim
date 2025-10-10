<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		Popover,
		PopoverContent,
		PopoverTrigger
	} from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import type { Gear } from '@malib/gear';
	import { useSetItems } from '$lib/hooks/set-item';
	import { useExclusiveEquips } from '$lib/hooks/exclusive-equip';
	import { createSetItemNameLoader } from '$lib/stores/set-item.svelte';
	import { createExclusiveEquipsLoader } from '$lib/stores/exclusive-equip.svelte';

	let { gear }: { gear: Gear } = $props();

	let open = $state(false);

	// Load set item and exclusive equip data
	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();
</script>

<Popover bind:open>
	<PopoverTrigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'size-14')}>
		<GearIcon icon={gear.shapeIcon} />
	</PopoverTrigger>
	<PopoverContent
		side="bottom"
		sideOffset={-56}
		align="end"
		class="w-min p-2"
		onclick={() => (open = false)}
	>
		<GearTooltip
			{gear}
			incline={{ combat: 0 }}
			loadSetItemName={createSetItemNameLoader(setItems.data)}
			loadExclusiveEquips={createExclusiveEquipsLoader(exclusiveEquips.data)}
		/>
	</PopoverContent>
</Popover>
