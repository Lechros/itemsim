<script lang="ts">
	import { ButtonGroup } from '$lib/shared/ui';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/shared/shadcn/components/ui/tabs';
	import { Gear } from '@malib/gear';
	import { getDisplayMaxStar } from '../model/star';
	import { showStarScrollTab } from '../model/starScroll';
	import StarDisplay from './StarDisplay.svelte';
	import StarforceTab from './StarforceTab.svelte';
	import StarScrollTab from './StarScrollTab.svelte';
	import { toast } from 'svelte-sonner';

	let { gear }: { gear: Gear } = $props();

	let ignoreMaxStar = $state(false);

	function handleReset(gear: Gear) {
		gear.resetStarforce();
		toast.success('스타포스 강화를 초기화했어요.', {
			position: 'top-center',
			duration: 1000
		});
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs lg:hidden">
		<Card class="p-4">
			<StarDisplay
				star={gear.star}
				maxStar={getDisplayMaxStar(gear)}
				color={gear.starScroll ? 'blue' : 'yellow'}
			/>
		</Card>
	</div>

	<Tabs value="starforce" class="gap-y-4">
		{#if showStarScrollTab(gear)}
			<TabsList class="grid w-full grid-cols-2">
				<TabsTrigger value="starforce">스타포스</TabsTrigger>
				<TabsTrigger value="starScroll">놀장강</TabsTrigger>
			</TabsList>
		{/if}
		<TabsContent value="starforce" class="flex flex-col gap-y-4">
			<StarforceTab {gear} bind:ignoreMaxStar />
		</TabsContent>
		<TabsContent value="starScroll" class="flex flex-col gap-y-4">
			<StarScrollTab {gear} bind:ignoreMaxStar />
		</TabsContent>
	</Tabs>

	<Separator />

	<ButtonGroup>
		<Button
			variant="destructive"
			onclick={() => handleReset(gear)}
			disabled={!gear.canResetStarforce}
		>
			스타포스 강화 초기화
		</Button>
	</ButtonGroup>
</div>
