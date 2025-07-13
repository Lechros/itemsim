<script lang="ts">
	import {
		getItemRawIconOrigin,
		getItemRawIconOriginBatched,
		getItemRawIconUrl
	} from '$lib/shared/api';
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

	const getItemRawIconOriginFunc = batch ? getItemRawIconOriginBatched : getItemRawIconOrigin;

	const query = createQuery(() => ({
		queryKey: ['item-raw-icon-origin', icon],
		queryFn: () => getItemRawIconOriginFunc(icon),
		staleTime: 1000 * 60 * 60 // 1 hour
	}));

	const origin = $derived(query.data);
</script>

<OriginIcon src={getItemRawIconUrl(icon)} alt={icon} {origin} {scale} />
