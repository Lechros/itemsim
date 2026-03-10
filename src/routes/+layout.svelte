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
				alert('[알림] 업데이트가 완료되었습니다. 프리뷰는 일정 기간 유지 후 접속이 불가하므로 https://itemsim.com/를 이용해주세요.');
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
