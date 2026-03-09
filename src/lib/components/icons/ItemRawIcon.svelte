<script lang="ts">
	import { getItemRawIconOrigin, getItemRawIconUrl } from '$lib/api';
	import OriginIcon from './OriginIcon.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	let {
		icon,
		scale = 1
	}: {
		icon: string;
		scale?: number;
	} = $props();

	const query = createQuery(() => ({
		queryKey: ['item-raw-icon-origin', icon],
		queryFn: () => getItemRawIconOrigin(icon),
		staleTime: 1000 * 60 * 60 // 1 hour
	}));

	const origin = $derived(query.data);
</script>

<OriginIcon src={getItemRawIconUrl(icon)} alt={icon} {origin} {scale} />
