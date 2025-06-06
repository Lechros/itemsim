<script lang="ts">
	import { Alert, AlertTitle } from '$lib/shared/shadcn/components/ui/alert';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { cn } from '$lib/shared/shadcn/utils';
	import { Trash2 } from 'lucide-svelte';
	import type { Deleter } from '../model/Deleter.svelte';
	import type { GearCountLiveQuery } from '../model/GearCountLiveQuery.svelte';
	import type { GearLiveQuery } from '../model/GearLiveQuery.svelte';
	import AddButton from './AddButton.svelte';
	import DeleteButton from './DeleteButton.svelte';
	import FilterInput from './FilterInput.svelte';
	import GearCountDisplay from './GearCountDisplay.svelte';
	import LayoutButton from './LayoutButton.svelte';
	import SelectedCountBadge from './SelectedCountBadge.svelte';
	import SortButton from './SortButton.svelte';
	import type { LayoutStore } from '../model/LayoutStore.svelte';

	type Mode = 'default' | 'delete';

	let {
		gearQuery,
		countQuery,
		deleter,
		scrollY,
		mode = $bindable('default'),
		layoutStore,
		top,
		onModeChange
	}: {
		gearQuery: GearLiveQuery;
		countQuery: GearCountLiveQuery;
		deleter: Deleter;
		scrollY: number;
		mode: Mode;
		layoutStore: LayoutStore;
		top: number;
		onModeChange: (mode: Mode) => void;
	} = $props();

	const SCROLL_THRESHOLD = 80;

	function toggleDeleteMode() {
		mode = mode === 'delete' ? 'default' : 'delete';
		deleter.clear();
		onModeChange(mode);
	}
</script>

<div class="sticky z-10 mx-auto max-w-screen-md px-4 py-2" style="top: {top}px">
	<div
		class={cn(
			'bg-background/95 flex flex-col gap-y-4 rounded-xl p-4 backdrop-blur',
			scrollY > SCROLL_THRESHOLD && 'shadow-lg'
		)}
	>
		<div class="flex items-center justify-between gap-x-2">
			<div class="flex items-center gap-x-2">
				<div class={[mode === 'delete' && 'hidden min-[450px]:block']}>
					<GearCountDisplay count={countQuery.value} />
				</div>
			</div>
			<div class="flex items-center gap-x-2">
				{#if mode === 'default'}
					<Button
						variant="outline"
						onclick={toggleDeleteMode}
						disabled={gearQuery.isLoadedAndEmpty}
					>
						삭제
					</Button>
					<AddButton />
				{:else}
					<SelectedCountBadge count={deleter.count} />
					<Button
						variant="outline"
						onclick={toggleDeleteMode}
						disabled={gearQuery.isLoadedAndEmpty}
					>
						돌아가기
					</Button>
					<DeleteButton {deleter} postDelete={() => (mode = 'default')} />
				{/if}
			</div>
		</div>
		<div class="flex items-center justify-between gap-x-2">
			<div class="flex items-center gap-x-2">
				<FilterInput bind:value={gearQuery.search} />
				<SortButton bind:sort={gearQuery.sort} />
			</div>
			<div>
				<LayoutButton {layoutStore} />
			</div>
		</div>
		{#if mode === 'delete'}
			<Alert variant="destructive">
				<Trash2 />
				<AlertTitle>삭제할 아이템을 선택해 주세요.</AlertTitle>
			</Alert>
		{/if}
	</div>
</div>
