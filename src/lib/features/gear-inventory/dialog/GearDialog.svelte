<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
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
	<Dialog.Content class="w-fit">
		<Dialog.Header>
			<Dialog.Title />
		</Dialog.Header>

		<GearTooltipRenderer
			{gear}
			tooltipVersion={settingsStore.tooltipVersion}
			tooltip1Options={settingsStore.tooltip1Options}
			tooltip2Options={settingsStore.tooltip2Options}
		/>

		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>닫기</Dialog.Close>
			<Button onclick={onAccept}>강화하기</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
