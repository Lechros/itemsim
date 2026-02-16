<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GearEnchantUI } from '$lib/features/gear-enchant-ui';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import { getGearData, updateGearData } from '$lib/stores/gear-inventory';
	import { Gear, type GearData } from '@malib/gear';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const seq = $derived(Number(data.seq));
	const initialTab = $derived<string | undefined>(data.initialTab);

	let isLoading = $state(true);
	let gearData = $state<GearData | undefined>(undefined);
	let lastGearData = $state<GearData | undefined>(undefined);
	let pendingBaseHash = $state<string | undefined>(undefined);
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

	function onGearUpdated(newGear: GearData, newHash: string) {
		gearData = newGear;
		pendingBaseHash = newHash;
	}

	$effect(() => {
		if (gearData && JSON.stringify(gearData) !== JSON.stringify(lastGearData)) {
			const snapshot = $state.snapshot(gearData);
			updateGearData(seq, snapshot, pendingBaseHash ? { hash: pendingBaseHash } : undefined)
				.then(() => {
					lastGearData = snapshot;
					pendingBaseHash = undefined;
				})
				.catch((e) => {
					toast.error('아이템 저장에 실패했습니다.', {
						description: e.message,
						position: 'top-center'
					});
				});
		}
	});
</script>

<svelte:head>
	{#if gear}
		<title>{gear.name} - 아이템 시뮬레이터</title>
	{/if}
</svelte:head>

<ScrollArea class="h-dvh">
	<MainNavbar />

	{#if isLoading}
		<div class="flex w-full items-center justify-center py-4">
			<Loader2 class="h-10 w-10 animate-spin" />
		</div>
	{:else if !gear}
		<div class="flex w-full flex-col items-center justify-center gap-4 py-4">
			<h2 class="text-2xl font-semibold">잘못된 접근입니다.</h2>
			<Button variant="outline" href="/">돌아가기</Button>
		</div>
	{:else}
		<GearEnchantUI {gear} {seq} {initialTab} {onGearUpdated} />
	{/if}
</ScrollArea>
