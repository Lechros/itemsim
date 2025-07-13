<script lang="ts">
	import { getGearIconOrigin, getGearIconOriginBatched, getGearIconUrl } from '$lib/shared/api';
	import { OriginIcon } from '$lib/shared/ui';
	import { createQuery } from '@tanstack/svelte-query';

	let {
		icon,
		scale = 1,
		batch = true
	}: {
		icon: string;
		scale?: number;
		batch?: boolean;
	} = $props();

	const getGearIconOriginFunc = batch ? getGearIconOriginBatched : getGearIconOrigin;

	const query = createQuery(() => ({
		queryKey: ['gear-icon-origin', icon],
		queryFn: () => getGearIconOriginFunc(icon),
		staleTime: 1000 * 60 * 60 // 1 hour
	}));

	const origin = $derived(query.data);
</script>

<OriginIcon src={getGearIconUrl(icon)} alt={icon} {origin} {scale} />
