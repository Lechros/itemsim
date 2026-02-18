<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ReadonlyGear } from '@malib/gear';
	import { getContext } from 'svelte';

	let {
		gear,
		open = $bindable(false),
		onAccept
	}: {
		gear: ReadonlyGear;
		open?: boolean;
		onAccept: () => void;
	} = $props();

	const settingsStore = getContext<SettingsStore>('settingsStore');
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-full w-fit max-w-none p-4 pt-6 sm:p-6">
		<Dialog.Header>
			<Dialog.Title />
		</Dialog.Header>

		<div class="flex justify-center">
			<ScrollArea class="max-h-[calc(100dvh-8rem)]">
				<GearTooltipRenderer
					{gear}
					tooltipVersion={settingsStore.tooltipVersion}
					tooltip1Options={settingsStore.tooltip1Options}
					tooltip2Options={settingsStore.tooltip2Options}
				/>
			</ScrollArea>
		</div>

		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>닫기</Dialog.Close>
			<Button onclick={onAccept}>강화하기</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
