import { createQuery } from '@tanstack/svelte-query';
import { getSetItems, type SetItemData } from '$lib/api';

export function useSetItems() {
	return createQuery(() => ({
		queryKey: ['set-items'],
		queryFn: getSetItems,
		staleTime: Infinity, // 세션 동안 유지
		gcTime: Infinity
	}));
}
