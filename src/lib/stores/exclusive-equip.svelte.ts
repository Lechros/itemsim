import type { ExclusiveEquipData } from '$lib/api';

export function createExclusiveEquipsLoader(data?: ExclusiveEquipData) {
    const exclusiveEquipMap = new Map<number, string[]>();
    for ( const exclusiveEquip of Object.values(data ?? {})) {
        for ( const itemId of exclusiveEquip.itemIds) {
            exclusiveEquipMap.set(itemId, exclusiveEquip.names);
        }
    }
    
	return (gearId: number): string[] => {
		return exclusiveEquipMap.get(gearId) || [];
	};
}
