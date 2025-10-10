import { createQuery } from '@tanstack/svelte-query';
import { getExclusiveEquips, type ExclusiveEquipData } from '$lib/api';

export function useExclusiveEquips() {
	return createQuery(() => ({
		queryKey: ['exclusive-equips'],
		queryFn: getExclusiveEquips,
		staleTime: Infinity,
		gcTime: Infinity
	}));
}
