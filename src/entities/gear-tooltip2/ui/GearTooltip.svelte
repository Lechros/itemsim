<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, ReadonlyGear } from '@malib/gear';
	import FrameLine from './parts/frame/FrameLine.svelte';
	import FrameMiddle from './parts/frame/FrameMiddle.svelte';
	import FrameTop from './parts/frame/FrameTop.svelte';
	import Spacer from './parts/Spacer.svelte';
	import Stars from './parts/star/Stars.svelte';
	import Text from './parts/Text.svelte';

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

<div class="relative">
	<FrameTop>
		<Stars
			star={gear.star}
			maxStar={gear.attributes.canStarforce === GearCapability.Fixed ? gear.star : gear.maxStar}
			color={gear.starScroll ? 'blue' : 'yellow'}
			class="mt-[10px]"
		/>
		{#if gear.star >= 23}
			<UIImage2 image="particleStar" class="absolute top-px left-0" />
		{/if}
		<Spacer height={8} />
		{#if false}
			<Text color="gray" class="mt-[1px] self-center">의</Text>
		{/if}
		<Text variant="itemName" class="self-center">{gear.name}</Text>
	</FrameTop>
	<FrameLine />
	<FrameMiddle></FrameMiddle>
</div>
