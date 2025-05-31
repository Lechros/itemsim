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
</script>

<Toaster />

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
