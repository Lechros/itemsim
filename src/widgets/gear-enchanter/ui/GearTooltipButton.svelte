<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { buttonVariants } from '$lib/shared/shadcn/components/ui/button';
	import {
		Popover,
		PopoverContent,
		PopoverTrigger
	} from '$lib/shared/shadcn/components/ui/popover';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Gear } from '@malib/gear';

	let { gear }: { gear: Gear } = $props();

	let open = $state(false);
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
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</PopoverContent>
</Popover>
