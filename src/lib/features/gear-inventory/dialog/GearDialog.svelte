<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
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
	<DialogContent class="max-h-full w-fit max-w-none p-4 pt-6 sm:p-6">
		<DialogHeader>
			<DialogTitle />
		</DialogHeader>

		<div class="flex justify-center">
			<ScrollArea class="max-h-[calc(100dvh-8rem)]">
				<GearTooltipRenderer {gear} incline={{ combat: 0 }} />
			</ScrollArea>
		</div>

		<DialogFooter class="flex-row justify-end">
			<Button variant="outline" class="flex-1/3 sm:flex-none" onclick={onClose}>닫기</Button>
			<Button class="flex-2/3 sm:flex-none" onclick={onAccept}>강화하기</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
