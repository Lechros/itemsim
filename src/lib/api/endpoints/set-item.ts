import ky from 'ky';
import { env } from '$lib/config/env';
import type { GearOption } from '@malib/gear';

export interface SetItemData {
	[setItemId: number]: SetItem;
}

export interface SetItem {
    name: string;
    itemIds: number[];
    effects?: Record<string, GearOption>;
    jokerPossible?: boolean;
    zeroWeaponJokerPossible?: boolean;
}


export async function getSetItems(): Promise<SetItemData> {
	return await ky.get(new URL('/set-items', env.API_URL)).json<SetItemData>();
}
