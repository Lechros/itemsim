<script lang="ts">
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { GearIcon } from '$lib/entities/gear-icon';
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import { FollowCursor } from '$lib/shared/ui';
	import type { Gear } from '@malib/gear';

	let {
		gear
	}: {
		gear: Gear;
	} = $props();

	let visible = $state(false);
</script>

<div class="flex flex-col">
	<div class="flex justify-center">
		<div
			onmouseenter={() => (visible = true)}
			onmouseleave={() => (visible = false)}
			role="tooltip"
		>
			<Card class="flex h-32 w-32 items-center justify-center">
				<GearIcon icon={gear.icon} scale={2} />
			</Card>
		</div>
	</div>
	<div class="mt-4 flex flex-col">
		<h3 class="text-center text-xl font-semibold">{gear.name}</h3>
	</div>
</div>

{#if visible}
	<FollowCursor>
		<GearTooltip
			{gear}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</FollowCursor>
{/if}
