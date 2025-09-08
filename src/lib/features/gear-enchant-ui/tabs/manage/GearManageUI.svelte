<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Gear, ReadonlyGear } from '@malib/gear';
	import { toast } from 'svelte-sonner';
	import { applyPatch, isPatchSatisfied } from './model/patch';
	import { getSpecialPatches } from './model/patches';

	let { gear }: { gear: Gear } = $props();

	const patches = $derived(getSpecialPatches(gear));
</script>

<div class="flex flex-col gap-y-4">
	{#if patches.length > 0}
		<div class="flex flex-col gap-2">
			<h4 class="text-lg font-semibold">아이템 프리셋</h4>
			<div class="flex flex-col divide-y">
				{#each patches as patch}
					<div class="hover:bg-accent py-4 ps-2 pe-4 transition-colors">
						<div class="flex items-center justify-between gap-2">
							<div class="flex flex-col gap-1">
								<h5 class="text-sm font-medium">{patch.name}</h5>
								<p class="text-muted-foreground text-sm">{patch.desc}</p>
							</div>
							<Button
								onclick={() => {
									applyPatch(gear, patch);
									toast.success(`선택한 프리셋을 적용했어요.`, {
										description: patch.name,
										position: 'top-center'
									});
								}}
								disabled={isPatchSatisfied(new ReadonlyGear($state.snapshot(gear.data)), patch)}
							>
								적용
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
