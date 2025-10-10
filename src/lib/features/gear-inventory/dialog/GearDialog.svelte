<script lang="ts">
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogFooter, DialogHeader } from '$lib/components/ui/dialog';
	import { ReadonlyGear } from '@malib/gear';

	let {
		gear,
		open = $bindable(false),
		onAccept,
		onClose
	}: {
		gear: ReadonlyGear;
		open?: boolean;
		onAccept: () => void;
		onClose: () => void;
	} = $props();
</script>

<Dialog bind:open>
	<DialogContent class="max-h-[calc(100%-2rem)] w-fit max-w-none overflow-y-auto">
		<DialogHeader />

		<div class="flex justify-center">
			<GearTooltipRenderer {gear} incline={{ combat: 0 }} />
		</div>

		<DialogFooter>
			<Button variant="outline" onclick={onClose}>닫기</Button>
			<Button onclick={onAccept}>강화하기</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
