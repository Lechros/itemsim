import ky from 'ky';
import { env } from '$lib/config/env';

export interface ExclusiveEquipData {
	[id: number]: ExclusiveEquip;
}

export interface ExclusiveEquip {
    itemIds: number[];
    names: string[];
}


export async function getExclusiveEquips(): Promise<ExclusiveEquipData> {
	return await ky.get(new URL('/exclusive-equips', env.API_URL)).json<ExclusiveEquipData>();
}
