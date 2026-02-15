<script lang="ts">
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import { FontRenderProvider } from '$lib/components/gear-tooltip2';
	import { Toaster } from '$lib/components/ui/sonner';
	import { getSettingsStore, type SettingsStore } from '$lib/stores/settings.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();

	// 서버에서는 기본값 스토어, 클라이언트에서는 싱글톤(영속화) — SSR 시 undefined 접근 방지
	setContext<SettingsStore>('settingsStore', getSettingsStore());

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	$effect(() => {
		if (browser && typeof sessionStorage !== 'undefined') {
			const version = sessionStorage.getItem('next-version') ?? '0';
			if (version < '1') {
				sessionStorage.setItem('next-version', '1');
				alert('아이템 시뮬레이터 프리뷰 버전입니다. 미완성된 기능이나 버그가 있을 수 있습니다.');
			}
		}
	});
</script>

<ModeWatcher />
<Toaster />

<QueryClientProvider client={queryClient}>
	<FontRenderProvider>
		{@render children()}
	</FontRenderProvider>
</QueryClientProvider>
