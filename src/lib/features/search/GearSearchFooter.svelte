<script lang="ts">
	import { goto } from '$app/navigation';
	import { addGearData } from '$lib/stores/gear-inventory';
	import { getGearDatas, type SearchGearSummary } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { josa } from 'es-hangul';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { slide } from 'svelte/transition';
	import ActionButtons from './ActionButtons.svelte';
	import SelectedGearsList from './SelectedGearsList.svelte';

	let {
		selectedGears,
		onDeselect
	}: {
		selectedGears: SearchGearSummary[];
		onDeselect: (gear: SearchGearSummary) => void;
	} = $props();

	let open = $state(false);
	let isAdding = $state(false);

	async function handleAdd() {
		isAdding = true;
		try {
			const gears = await getGearDatas(selectedGears.map((gear) => gear.id));
			const seq = await addGearData(...gears);
			if (gears.length === 1) {
				toast.success(`${josa(gears[0].name, '을/를')} 추가했어요.`, {
					position: 'top-center',
					action: {
						label: '이동',
						onClick: () => {
							goto(`/gear/${seq}`);
						}
					}
				});
			} else {
				toast.success(`아이템 ${gears.length}개가 추가되었어요.`, {
					position: 'top-center'
				});
			}
		} catch (error) {
			toast.error('아이템을 추가하지 못했어요.', {
				description: error instanceof Error ? error.message : String(error),
				position: 'top-center'
			});
		} finally {
			isAdding = false;
		}
	}
</script>

<div class="h-[127px]"></div>

<div class="fixed bottom-0 w-full">
	{#if open}
		<div
			class="bg-card mx-auto w-full max-w-screen-md rounded-t-xl border border-b-0 shadow-lg"
			transition:slide={{ duration: 300 }}
		>
			<div class="flex flex-col px-4">
				<button
					class="flex cursor-pointer items-center justify-center p-2"
					onclick={() => (open = false)}
				>
					<ChevronDown class="text-muted-foreground size-4" />
				</button>
				<SelectedGearsList {selectedGears} {onDeselect} />
			</div>
		</div>
	{/if}
	<div class="bg-card relative border-t">
		<div class="mx-auto flex max-w-screen-md flex-col gap-4 p-4">
			<Button variant="ghost" size="sm" onclick={() => (open = !open)}>
				<div>
					선택된 아이템 <span class="text-base font-semibold">{selectedGears.length}</span>개
				</div>
				<ChevronUp class={cn('transition-transform', open ? 'rotate-180' : '')} />
			</Button>

			<ActionButtons
				handleSubmit={handleAdd}
				disabledSubmit={selectedGears.length === 0 || isAdding}
			/>
		</div>
	</div>
</div>
