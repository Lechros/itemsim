<script lang="ts">
	import { DetailNavbar } from '$lib/features/detail-navbar';
	import { getGearData, updateGearData } from '$lib/features/gear-inventory';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import ScrollArea from '$lib/shared/shadcn/components/ui/scroll-area/scroll-area.svelte';
	import GearEnchanter from '$lib/widgets/gear-enchanter/ui/GearEnchanter.svelte';
	import { Gear, type GearData } from '@malib/gear';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let {
		seq,
		initialTab
	}: {
		seq: number;
		initialTab?: string;
	} = $props();

	let isLoading = $state(true);
	let gearData = $state<GearData | undefined>(undefined);
	let lastGearData = $state<GearData | undefined>(undefined);
	const gear = $derived(gearData ? new Gear(gearData) : undefined);

	$effect(() => {
		getGearData(seq)
			.then((d) => {
				gearData = d;
				lastGearData = structuredClone(d);
			})
			.finally(() => {
				isLoading = false;
			});
	});

	$effect(() => {
		if (gearData && JSON.stringify(gearData) !== JSON.stringify(lastGearData)) {
			const snapshot = $state.snapshot(gearData);
			updateGearData(seq, snapshot)
				.then(() => {
					lastGearData = snapshot;
				})
				.catch((e) => {
					toast.error('아이템 저장에 실패했습니다.', {
						description: e.message
					});
				});
		}
	});
</script>

<ScrollArea class="h-screen">
	<DetailNavbar title="아이템 강화" backHref="/" />

	<div class="my-4 flex flex-col">
		{#if isLoading}
			<div class="flex w-full items-center justify-center">
				<Loader2 class="h-10 w-10 animate-spin" />
			</div>
		{:else if !gear}
			<div class="flex w-full flex-col items-center justify-center gap-4">
				<h2 class="text-2xl font-semibold">잘못된 접근입니다.</h2>
				<Button variant="outline" href="/">돌아가기</Button>
			</div>
		{:else}
			<GearEnchanter {gear} {initialTab} />
		{/if}
	</div>
</ScrollArea>
