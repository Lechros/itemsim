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
</script>

<ModeWatcher />
<Toaster />

<QueryClientProvider client={queryClient}>
	<FontRenderProvider>
		{@render children()}
	</FontRenderProvider>
</QueryClientProvider>
