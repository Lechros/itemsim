<script lang="ts">
	import { getContext } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Switch } from '$lib/components/ui/switch';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	const settingsStore = getContext<SettingsStore>('settingsStore');

	// tooltip2Options.expand는 중첩 객체라 로컬 state로 두고, 변경 시에만 스토어에 반영
	let tooltip2Expand = $state(settingsStore?.tooltip2Options.expand ?? false);

	// 로컬 → 스토어: 스위치 변경 시에만 반영
	$effect(() => {
		if (settingsStore && tooltip2Expand !== (settingsStore.tooltip2Options.expand ?? false)) {
			settingsStore.tooltip2Options = {
				...settingsStore.tooltip2Options,
				expand: tooltip2Expand
			};
		}
	});

	// 스토어 → 로컬: 직접 /settings 진입 시·hydration 후 스토어 값 표시
	$effect(() => {
		if (settingsStore) {
			tooltip2Expand = settingsStore.tooltip2Options.expand ?? false;
		}
	});
</script>

<svelte:head>
	<title>설정 - 아이템 시뮬레이터</title>
</svelte:head>

<MainNavbar />
<main class="min-h-[calc(100vh-3.5rem)] bg-background">
	<div class="mx-auto max-w-2xl px-4 py-6">
		<Button variant="ghost" size="sm" href="/" class="-ml-2 mb-4 text-muted-foreground">
			<ArrowLeft />
			뒤로
		</Button>

		<h1 class="mb-6 text-xl font-semibold">설정</h1>

		<Card.Root class="gap-4">
			<Card.Header class="pb-2">
				<Card.Title>툴팁</Card.Title>
				<Card.Description>장비 툴팁 표시 방식과 옵션을 선택합니다.</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-6 pt-0">
				{#if settingsStore}
					<div class="flex flex-col gap-3">
						<Label>툴팁 종류</Label>
						<RadioGroup bind:value={settingsStore.tooltipVersion} class="flex flex-col gap-3">
							<div class="flex items-center gap-3">
								<RadioGroupItem value="1" id="tooltip-v1" />
								<Label for="tooltip-v1" class="cursor-pointer font-normal">
									기존 툴팁 (V1)
								</Label>
							</div>
							<div class="flex items-center gap-3">
								<RadioGroupItem value="2" id="tooltip-v2" />
								<Label for="tooltip-v2" class="cursor-pointer font-normal">
									새 툴팁 (V2)
								</Label>
							</div>
						</RadioGroup>
					</div>

					{#if settingsStore.tooltipVersion === '1'}
						<div class="border-t pt-4">
							<p class="mb-3 text-sm font-medium text-muted-foreground">
								기존 툴팁 옵션
							</p>
							<p class="text-sm text-muted-foreground">
								추가 옵션은 추후 제공 예정입니다.
							</p>
						</div>
					{:else if settingsStore.tooltipVersion === '2'}
						<div class="border-t pt-4">
							<p class="mb-3 text-sm font-medium text-muted-foreground">
								새 툴팁 옵션
							</p>
							<div class="flex flex-col gap-3">
								<div class="flex items-center justify-between gap-4">
									<Label for="opt-v2-expand" class="cursor-pointer font-normal">
										강화 정보 펼침
									</Label>
									<Switch id="opt-v2-expand" bind:checked={tooltip2Expand} />
								</div>
								<p class="text-xs text-muted-foreground">
									스타포스·주문서·추가옵션 등 강화 상세를 기본으로 펼쳐서 표시합니다.
								</p>
							</div>
						</div>
					{/if}
				{:else}
					<p class="text-sm text-muted-foreground">설정을 불러오는 중입니다.</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</main>
