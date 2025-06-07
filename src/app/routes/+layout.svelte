<script lang="ts">
	import { browser } from '$app/environment';
	import { Toaster } from '$lib/shared/shadcn/components/ui/sonner';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';

	let { children } = $props();

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

<Toaster />

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
