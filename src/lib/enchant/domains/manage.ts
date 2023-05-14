import { stringifyGearMeta } from '$lib/export';
import type { GearMeta } from '$lib/inventory/stores/gear-store';
import type { Gear } from '@malib/gear';
import { compressToBase64, compressToEncodedURIComponent } from 'lz-string';

export function getGearString(gear: Gear, meta: GearMeta) {
	return stringifyGearMeta(gear, meta);
}

export function getGearBase64String(gearString: string) {
	return compressToBase64(gearString);
}

export function getGearURIComponent(gearString: string) {
	return compressToEncodedURIComponent(gearString);
}

export function getFilename(gear: Gear) {
	return gear.name + '.sim';
}
