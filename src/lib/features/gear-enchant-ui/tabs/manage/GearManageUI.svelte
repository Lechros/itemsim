<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Item from '$lib/components/ui/item';
	import { Spinner } from '$lib/components/ui/spinner';
	import { runTransmit, shouldTransmit } from '$lib/gear';
	import { Gear, ReadonlyGear, type GearData } from '@malib/gear';
	import { toast } from 'svelte-sonner';
	import FormControl from '../../form/FormControl.svelte';
	import FormItem from '../../form/FormItem.svelte';
	import FormLabel from '../../form/FormLabel.svelte';
	import FormSection from '../../form/FormSection.svelte';
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
				toast.success('아이템 버전을 업데이트했어요.', {
					description: result.gear.name,
					position: 'top-center'
				});
			}
		} catch (e) {
			if (signal.aborted) return;
			toast.error('아이템 버전 업데이트에 실패했어요.', {
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

<FormSection>
	<FormItem>
		<FormLabel
			title="아이템 업데이트"
			description={hasBaseUpdate
				? '아이템 버전을 업데이트할 수 있어요.'
				: '이미 최신 버전의 아이템이에요.'}
			disabled={!hasBaseUpdate}
		/>
		<FormControl>
			<Button size="sm" disabled={!hasBaseUpdate || isApplyingTransmit} onclick={applyTransmit}>
				{#if isApplyingTransmit}
					<Spinner />
				{/if}
				업데이트
			</Button>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection class="gap-5">
	<FormItem>
		<FormLabel
			title="아이템 프리셋"
			description={patches.length > 0
				? '아이템에 제공되는 프리셋이 있어요.'
				: '아이템에 제공되는 프리셋이 없어요.'}
			disabled={patches.length === 0}
		/>
	</FormItem>
	{#each patches as patch}
		{@const isSatisfied = isPatchSatisfied(new ReadonlyGear($state.snapshot(gear.data)), patch)}
		<Item.Root variant="muted" size="sm">
			<Item.Content>
				<Item.Title>{patch.name}</Item.Title>
				<Item.Description class="text-xs">{patch.desc}</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button
					variant="outline"
					size="sm"
					onclick={() => {
						applyPatch(gear, patch);
						toast.success(`선택한 프리셋을 적용했어요.`, {
							description: patch.name,
							position: 'top-center'
						});
					}}
					disabled={isSatisfied}
				>
					{#if isSatisfied}
						완료
					{:else}
						적용
					{/if}
				</Button>
			</Item.Actions>
		</Item.Root>
	{/each}
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel title="이미지 다운로드" />
		<FormControl>
			<ImageDialog {gear} />
		</FormControl>
	</FormItem>
</FormSection>
