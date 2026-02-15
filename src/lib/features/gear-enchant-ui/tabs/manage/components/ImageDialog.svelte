<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ReadonlyGear } from '@malib/gear';
	import { toPng } from 'html-to-image';
	import { AlertCircle, Loader2 } from 'lucide-svelte';
	import { getContext, untrack } from 'svelte';
	import { devicePixelRatio } from 'svelte/reactivity/window';

	let {
		gear,
	}: {
		gear: ReadonlyGear;
	} = $props();

	let open = $state(false);

	let container: HTMLDivElement | null = $state(null);
	let dataUrl: string | null = $state(null);
	let maybeInvalidImage = $state(false);

	const settingsStore = getContext<SettingsStore>('settingsStore');

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

	const close = () => {
		open = false;
	};
</script>

<Dialog.Root bind:open {onOpenChangeComplete}>
	<Dialog.Trigger class={buttonVariants()}>열기</Dialog.Trigger>
	<Dialog.Content class="max-h-full w-fit max-w-none p-4 sm:p-6">
		<Dialog.Header>
			<Dialog.Title class="text-base">아이템 이미지</Dialog.Title>
		</Dialog.Header>

		{#if dataUrl}
			<div class="flex flex-col gap-2">
				<img src={dataUrl} alt={gear.name} class="max-w-none" style={settingsStore.tooltipVersion === '1' ? "width: 261px" : "width: 324px"} />
				{#if maybeInvalidImage}
					<Alert.Root variant="destructive">
						<AlertCircle />
						<Alert.Title>이미지가 정확하지 않을 수 있어요.</Alert.Title>
						<Alert.Description>PC와 브라우저의 배율이 100%인지 확인해 주세요.</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
		{:else}
			<div class="relative">
				<div bind:this={container}>
					<GearTooltipRenderer
						{gear}
						tooltipVersion={settingsStore.tooltipVersion}
						tooltip1Options={settingsStore.tooltip1Options}
						tooltip2Options={settingsStore.tooltip2Options}
					/>
				</div>
				<Skeleton class="absolute inset-0" />
			</div>
		{/if}
		<Dialog.Footer class="flex-row justify-end">
			<Button variant="outline" class="flex-1/3 sm:flex-none" onclick={close}>닫기</Button>
			<Button class="flex-2/3 sm:flex-none" disabled={!dataUrl} onclick={download}>
				{#if !dataUrl}
					<Loader2 class="animate-spin" />
				{/if}
				이미지 저장
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
