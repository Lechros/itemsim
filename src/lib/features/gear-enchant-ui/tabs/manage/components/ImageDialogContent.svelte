<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import GearTooltipImageRenderer from '$lib/features/gear-tooltip-image-renderer/GearTooltipImageRenderer.svelte';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ReadonlyGear } from '@malib/gear';
	import { CircleAlertIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';

	let { gear }: { gear: ReadonlyGear } = $props();

	let dataUrl = $state<string | null>(null);
	let maybeInvalidImage = $state(false);

	const settingsStore = getContext<SettingsStore>('settingsStore');

	const tooltipVersion = $derived(settingsStore.tooltipVersion);

	$effect(() => {
		gear;
		dataUrl = null;
		maybeInvalidImage = false;
	});

	const download = () => {
		if (dataUrl) {
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `${gear.name}.png`;
			link.click();
		}
	};
</script>

<Dialog.Header>
	<Dialog.Title>아이템 이미지</Dialog.Title>
</Dialog.Header>

{#if dataUrl}
	<div class="flex flex-col gap-2">
		<img src={dataUrl} alt={gear.name} />
		{#if maybeInvalidImage}
			<Alert.Root variant="destructive">
				<CircleAlertIcon />
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

<Dialog.Footer>
	<Dialog.Close class={buttonVariants({ variant: 'outline' })}>닫기</Dialog.Close>
	<Button disabled={!dataUrl} onclick={download}>
		{#if !dataUrl}
			<Spinner />
		{/if}
		이미지 저장
	</Button>
</Dialog.Footer>
