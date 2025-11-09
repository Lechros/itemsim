<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import type { Gear } from '@malib/gear';

	let { gear }: { gear: Gear } = $props();

	let open = $state(false);
</script>

<Popover.Root bind:open>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'size-14')}>
		<GearIcon icon={gear.shapeIcon} />
	</Popover.Trigger>
	<Popover.Content
		side="bottom"
		sideOffset={-56}
		align="end"
		class="w-min p-2"
		onclick={() => (open = false)}
	>
		<GearTooltipRenderer {gear} incline={{ combat: 0 }} />
	</Popover.Content>
</Popover.Root>
