import ky from 'ky';
import { env } from '$lib/config/env';
import { join } from '$lib/api/url';

export interface ExclusiveEquipData {
	[id: number]: ExclusiveEquip;
}

export interface ExclusiveEquip {
	itemIds: number[];
	names: string[];
}

export async function getExclusiveEquips(): Promise<ExclusiveEquipData> {
	return await ky.get(join(env.API_URL, '/exclusive-equips')).json<ExclusiveEquipData>();
}
