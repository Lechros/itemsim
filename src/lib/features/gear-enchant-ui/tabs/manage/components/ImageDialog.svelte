<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { ReadonlyGear } from '@malib/gear';
	import { toPng } from 'html-to-image';
	import { Loader2 } from 'lucide-svelte';
	import { untrack } from 'svelte';
	import { devicePixelRatio } from 'svelte/reactivity/window';
	import { useSetItems } from '$lib/hooks/set-item';
	import { useExclusiveEquips } from '$lib/hooks/exclusive-equip';
	import { createSetItemNameLoader } from '$lib/stores/set-item.svelte';
	import { createExclusiveEquipsLoader } from '$lib/stores/exclusive-equip.svelte';

	let {
		gear
	}: {
		gear: ReadonlyGear;
	} = $props();

	let open = $state(false);

	// Load set item and exclusive equip data
	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();

	let container: HTMLDivElement | null = $state(null);
	let dataUrl: string | null = $state(null);
	let maybeInvalidImage = $state(false);

	$effect(() => {
		if (container && open) {
			untrack(() => {
				const expectedWidth = container!.clientWidth;
				toPng(container!, { cacheBust: true }).then((url) => {
					dataUrl = url;
					const newImg = document.createElement('img');
					newImg.src = url;
					newImg.onload = () => {
						const imageWidth = newImg.width;
						maybeInvalidImage = imageWidth !== expectedWidth || devicePixelRatio.current !== 1;
						newImg.remove();
					};
				});
			});
		}
	});

	const onOpenChangeComplete = (open: boolean) => {
		if (!open) {
			dataUrl = null;
		}
	};

	const download = () => {
		if (dataUrl) {
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `${gear.name}.png`;
			link.click();
		}
	};
</script>

<Dialog bind:open {onOpenChangeComplete}>
	<DialogTrigger class={buttonVariants()}>열기</DialogTrigger>
	<DialogContent class="w-fit">
		<DialogHeader />
		{#if dataUrl}
			<div>
				<img src={dataUrl} alt={gear.name} class="max-w-none" style="width: 324px" />
				{#if maybeInvalidImage}
					<p class="mt-2 text-sm" style="max-width: 324px">
						이미지가 정확하지 않을 수 있어요.<br />
						PC와 브라우저의 배율이 100%인지 확인해 주세요.
					</p>
				{/if}
			</div>
		{:else}
			<div class="relative">
				<div bind:this={container}>
					<GearTooltip
						{gear}
						incline={{ combat: 0 }}
						loadSetItemName={createSetItemNameLoader(setItems.data)}
						loadExclusiveEquips={createExclusiveEquipsLoader(exclusiveEquips.data)}
					/>
				</div>
				<Skeleton class="absolute inset-0" />
			</div>
		{/if}
		<DialogFooter>
			<Button disabled={!dataUrl} onclick={download}>
				{#if !dataUrl}
					<Loader2 class="animate-spin" />
				{/if}
				이미지 저장
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
