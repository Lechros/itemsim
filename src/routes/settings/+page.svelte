<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Switch } from '$lib/components/ui/switch';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { getContext } from 'svelte';

	const settingsStore = getContext<SettingsStore>('settingsStore');
</script>

<svelte:head>
	<title>설정 - 아이템 시뮬레이터</title>
</svelte:head>

<MainNavbar />
<main class="min-h-[calc(100vh-3.5rem)]">
	<div class="mx-auto max-w-2xl px-4 py-6">
		<Button variant="ghost" size="sm" href="/" class="text-muted-foreground mb-4 -ml-2">
			<ArrowLeft />
			뒤로
		</Button>

		<h1 class="mb-6 text-xl font-semibold">설정</h1>

		<Card.Root class="gap-4">
			<Card.Header class="pb-2">
				<Card.Title>툴팁</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-col gap-6 pt-0">
				{#if settingsStore}
					<div class="flex flex-col">
						<Label class="mb-4">툴팁 버전</Label>
						<RadioGroup bind:value={settingsStore.tooltipVersion} class="flex flex-col gap-3">
							<div class="flex items-center gap-3">
								<RadioGroupItem value="2" id="tooltip-v2" />
								<Label for="tooltip-v2" class="font-normal">3 - 최신</Label>
							</div>
							<div class="flex items-center gap-3">
								<RadioGroupItem value="1" id="tooltip-v1" />
								<Label for="tooltip-v1" class="font-normal">2 - 구버전 (베타)</Label>
							</div>
						</RadioGroup>
					</div>

					{#if settingsStore.tooltipVersion === '2'}
						<div class="border-t pt-4">
							<Label class="mb-4">툴팁 옵션</Label>
							<Label class="flex items-center justify-between gap-4">
								<div class="flex flex-col gap-2">
									<div>강화 정보 상세 표시</div>
									<p class="text-muted-foreground text-xs">
										스타포스·주문서·추가옵션 등 강화 상세 정보를 펼쳐서 표시해요.
									</p>
								</div>
								<Switch bind:checked={settingsStore.tooltip2Options.expand} />
							</Label>
						</div>
					{/if}
				{:else}
					<p class="text-muted-foreground text-sm">설정을 불러오는 중입니다.</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</main>
