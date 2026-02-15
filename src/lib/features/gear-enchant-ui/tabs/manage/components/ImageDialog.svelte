<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import GearTooltipImageRenderer from '$lib/features/gear-tooltip-image-renderer/GearTooltipImageRenderer.svelte';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ReadonlyGear } from '@malib/gear';
	import { AlertCircle, Loader2 } from 'lucide-svelte';
	import { getContext } from 'svelte';

	let {
		gear
	}: {
		gear: ReadonlyGear;
	} = $props();

	let open = $state(false);
	let dataUrl = $state<string | null>(null);
	let maybeInvalidImage = $state(false);

	const settingsStore = getContext<SettingsStore>('settingsStore');

	const tooltipVersion = $derived(settingsStore.tooltipVersion);

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
				<img src={dataUrl} alt={gear.name} class="max-w-none" />
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
				<GearTooltipImageRenderer
					{gear}
					{tooltipVersion}
					tooltip1Options={settingsStore.tooltip1Options}
					tooltip2Options={settingsStore.tooltip2Options}
					bind:dataUrl
					bind:maybeInvalidImage
				/>
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
