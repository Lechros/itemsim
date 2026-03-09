import { getSetItems, type SetItemData } from '$lib/api';
import { createQuery } from '@tanstack/svelte-query';

export function useSetItems() {
	return createQuery(() => ({
		queryKey: ['set-items'],
		queryFn: getSetItems,
		staleTime: 60 * 60 * 1000,
		gcTime: 60 * 60 * 1000
	}));
}

export function createSetItemNameLoader(data?: SetItemData) {
	return (setItemId: number): string => {
		if (!data) return '???';
		return data[setItemId]?.name || '???';
	};
}
