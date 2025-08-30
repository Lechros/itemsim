<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader
	} from '$lib/shared/shadcn/components/ui/dialog';
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
	<DialogContent class="w-fit max-w-none max-h-[calc(100%-2rem)] overflow-y-auto">
		<DialogHeader />

		<div class="flex justify-center">
			<GearTooltip
				{gear}
				incline={{ combat: 0 }}
				loadSetItemName={() => '보스 장신구 세트'}
				loadExclusiveEquips={() => []}
			/>
		</div>

		<DialogFooter>
			<Button variant="outline" onclick={onClose}>닫기</Button>
			<Button onclick={onAccept}>강화하기</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
