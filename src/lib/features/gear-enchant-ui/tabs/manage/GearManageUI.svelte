<script lang="ts">
	import { ButtonGroup } from '$lib/components/button-group';
	import * as Alert from '$lib/components/ui/alert';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { runTransmit, shouldTransmit } from '$lib/gear';
	import { Gear, ReadonlyGear, type GearData } from '@malib/gear';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import ImageDialog from './components/ImageDialog.svelte';
	import { applyPatch, isPatchSatisfied } from './model/patch';
	import { getSpecialPatches } from './model/patches';

	let {
		gear,
		seq,
		onGearUpdated
	}: {
		gear: Gear;
		seq: number;
		onGearUpdated?: (newGear: GearData, newHash: string) => void | Promise<void>;
	} = $props();

	let hasBaseUpdate = $state(false);
	let isApplyingTransmit = $state(false);
	const patches = $derived(getSpecialPatches(gear));

	let abortController = $state<AbortController | null>(null);
	let isAborting = $state(false);

	$effect(() => {
		if (seq == null) return;
		shouldTransmit(seq).then((v) => {
			hasBaseUpdate = v;
		});
	});

	async function applyTransmit() {
		if (!onGearUpdated) return;
		isApplyingTransmit = true;
		abortController = new AbortController();
		const signal = abortController.signal;
		try {
			const result = await runTransmit(seq, signal);
			if (result) {
				await onGearUpdated(result.gear, result.hash);
				hasBaseUpdate = false;
				toast.success('장비 정보를 업데이트했어요.', {
					description: result.gear.name,
					position: 'top-center'
				});
			}
		} catch (e) {
			if (signal.aborted) return;
			toast.error('장비 정보 업데이트에 실패했어요.', {
				description: e instanceof Error ? e.message : String(e),
				position: 'top-center'
			});
		} finally {
			isApplyingTransmit = false;
			abortController = null;
			setTimeout(() => {
				isAborting = false;
			}, 200);
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	{#if hasBaseUpdate && onGearUpdated}
		<Alert.Root class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<Alert.Title>최신 장비 정보로 업데이트할 수 있어요.</Alert.Title>
			<AlertDialog.Root open={isApplyingTransmit}>
				<AlertDialog.Trigger>
					<Button size="sm" disabled={isApplyingTransmit} onclick={applyTransmit}>
						{#if isApplyingTransmit}
							<Loader2 class="animate-spin" />
						{/if}
						업데이트
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>{isAborting ? '취소 중' : '장비 정보 업데이트 중'}</AlertDialog.Title>
					<AlertDialog.Description
						>{isAborting
							? '업데이트를 취소하고 있어요.'
							: '취소해도 추후에 업데이트할 수 있어요.'}</AlertDialog.Description
					>
					<AlertDialog.Footer>
						<AlertDialog.Action
							disabled={isAborting}
							onclick={() => {
								isAborting = true;
								abortController?.abort();
								abortController = null;
							}}
						>
							{#if isAborting}
								<Loader2 class="animate-spin" />
							{/if}
							취소
						</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Alert.Root>
	{/if}
	<div class="flex flex-col gap-2">
		<h4 class="text-lg font-semibold">아이템 이미지</h4>
		<ButtonGroup>
			<ImageDialog {gear} />
		</ButtonGroup>
	</div>

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
