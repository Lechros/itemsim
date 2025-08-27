<script lang="ts">
	import { getGearIconOrigin, getGearIconUrl } from '$lib/shared/api';
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
		queryKey: ['gear-icon-origin', icon],
		queryFn: () => getGearIconOrigin(icon),
		staleTime: 1000 * 60 * 60 // 1 hour
	}));

	const origin = $derived(query.data);
</script>

<OriginIcon src={getGearIconUrl(icon)} alt={icon} {origin} {scale} />
