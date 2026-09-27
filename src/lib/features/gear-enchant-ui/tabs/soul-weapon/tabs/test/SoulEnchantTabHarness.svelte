<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import type { Gear } from '@malib/gear';
	import SoulEnchantTab from '../SoulEnchantTab.svelte';
	let { gear }: { gear: Gear } = $props();
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
</script>

<QueryClientProvider {client}>
	<SoulEnchantTab {gear} />
</QueryClientProvider>
