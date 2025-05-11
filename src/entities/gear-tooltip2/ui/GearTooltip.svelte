<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, ReadonlyGear } from '@malib/gear';
	import Frame from './parts/Frame.svelte';
	import Stars from './parts/star/Stars.svelte';
	import Text from './parts/Text.svelte';
	import Spacer from './parts/Spacer.svelte';

	let {
		gear,
		cannot = {},
		incline
	}: {
		gear: ReadonlyGear;
		cannot?: {
			level?: boolean;
			job?: boolean;
		};
		incline: { equipped: true } | { combat: number };
	} = $props();
</script>

<Frame>
	<Stars
		star={gear.star}
		maxStar={gear.attributes.canStarforce === GearCapability.Fixed ? gear.star : gear.maxStar}
		color={gear.starScroll ? 'blue' : 'yellow'}
	/>
	{#if gear.star >= 23}
		<UIImage2 image="particleStar" class="absolute top-px left-0" />
	{/if}
	<Spacer height={8} />
	{#if false}
		<Text color="gray" class="mt-[1px] self-center">의</Text>
	{/if}
	<Text variant="itemName" class="self-center">{gear.name}</Text>
</Frame>
