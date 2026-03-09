import { createQuery } from '@tanstack/svelte-query';
import { getExclusiveEquips, type ExclusiveEquipData } from '$lib/api';

export function useExclusiveEquips() {
	return createQuery(() => ({
		queryKey: ['exclusive-equips'],
		queryFn: getExclusiveEquips,
		staleTime: 60 * 60 * 1000,
		gcTime: 60 * 60 * 1000
	}));
}

export function createExclusiveEquipsLoader(data?: ExclusiveEquipData) {
	const exclusiveEquipMap = new Map<number, string[]>();
	for (const exclusiveEquip of Object.values(data ?? {})) {
		for (const itemId of exclusiveEquip.itemIds) {
			exclusiveEquipMap.set(itemId, exclusiveEquip.names);
		}
	}

	return (gearId: number): string[] => {
		return exclusiveEquipMap.get(gearId) || [];
	};
}
