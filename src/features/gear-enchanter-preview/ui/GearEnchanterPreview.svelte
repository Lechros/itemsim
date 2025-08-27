<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { FollowCursor } from '$lib/shared/ui';
	import type { Gear } from '@malib/gear';

	let {
		gear
	}: {
		gear: Gear;
	} = $props();

	let visible = $state(false);
</script>

<div class="flex flex-col gap-y-4">
	<div class="flex justify-center">
		<Card
			class="flex h-32 w-32 items-center justify-center"
			onmouseenter={() => (visible = true)}
			onmouseleave={() => (visible = false)}
		>
			<GearIcon icon={gear.icon} scale={2} />
		</Card>
	</div>
	<div class="flex flex-col">
		<h3 class="text-center text-xl font-semibold">{gear.name}</h3>
	</div>
</div>

<FollowCursor>
	{#if visible}
		<GearTooltip
			{gear}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	{/if}
</FollowCursor>
