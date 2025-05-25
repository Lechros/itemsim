<script lang="ts">
	import { getGearData } from '$lib/features/gear-inventory';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import ScrollArea from '$lib/shared/shadcn/components/ui/scroll-area/scroll-area.svelte';
	import { Gear, type GearData } from '@malib/gear';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isLoading = $state(true);
	let gearData = $state<GearData | undefined>(undefined);
	const gear = $derived(gearData ? new Gear(gearData) : undefined);

	$effect(() => {
		const loadGear = async () => {
			gearData = await getGearData(Number(data.seq));
			isLoading = false;
		};

		loadGear();
	});
</script>

{#if isLoading}
	Loading...
{:else}
	<ScrollArea class="flex h-screen flex-col">
		<!-- Header Section -->
		<header class="bg-background/80 sticky w-full border-b backdrop-blur">
			<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
				<div class="flex h-11 items-center gap-2">
					<Button variant="ghost" size="icon" href="/">
						<ArrowLeft />
					</Button>
					<span class="mt-px font-semibold">아이템 관리</span>
				</div>
			</div>
		</header>

		<div class="mx-auto h-screen w-full max-w-screen-md px-4">asdfasfsfdsfs</div>
	</ScrollArea>
{/if}
