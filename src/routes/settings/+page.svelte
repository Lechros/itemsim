<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select';
	import { Switch } from '$lib/components/ui/switch';
	import FormControl from '$lib/features/gear-enchant-ui/form/FormControl.svelte';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormLabel from '$lib/features/gear-enchant-ui/form/FormLabel.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { getContext } from 'svelte';

	const settingsStore = getContext<SettingsStore>('settingsStore');

	const tooltipVersions = [
		{ value: '2', label: '3 - 최신' },
		{ value: '1', label: '2 - 구버전 (베타)' }
	];
</script>

<svelte:head>
	<title>설정 - 아이템 시뮬레이터</title>
</svelte:head>

<ScrollArea class="h-dvh">
	<MainNavbar />

	<main class="mx-auto min-h-[calc(100%-3.5rem)] max-w-screen-sm sm:border-x">
		<div class="px-4 py-3">
			<Button
				variant="ghost"
				size="sm"
				class="text-muted-foreground cursor-pointer"
				onclick={() => history.back()}
			>
				<ArrowLeft />
				돌아가기
			</Button>
		</div>
		<FormSection>
			<h1 class="text-2xl">설정</h1>
		</FormSection>

		<FormSection>
			<FormItem>
				<FormLabel title="툴팁 버전" />
				<FormControl>
					<Select.Root type="single" bind:value={settingsStore.tooltipVersion}>
						<Select.Trigger class="w-full sm:w-40">
							{tooltipVersions.find((version) => version.value === settingsStore.tooltipVersion)
								?.label}
						</Select.Trigger>
						<Select.Content>
							{#each tooltipVersions as version}
								<Select.Item value={version.value}>{version.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</FormControl>
			</FormItem>
			{#if settingsStore.tooltipVersion === '2'}
				<FormItem>
					<FormLabel
						title="강화 정보 상세 표시"
						description="스타포스·주문서·추가옵션 등 강화 상세 정보를 펼쳐서 표시해요."
						variant="nested"
					/>
					<FormControl>
						<Switch bind:checked={settingsStore.tooltip2Options.expand} />
					</FormControl>
				</FormItem>
			{/if}
		</FormSection>
	</main>
</ScrollArea>
