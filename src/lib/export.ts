import type { GearMeta } from '$lib/inventory/stores/gear-store';
import { stringifyGear, type Gear } from '@malib/gear';
import { compressToBase64, compressToEncodedURIComponent } from 'lz-string';

export function stringifyGearMeta(gear: Gear, meta: GearMeta) {
	return stringifyGear(gear) + '|' + JSON.stringify(meta);
}

export function gearMetaToBase64(gear: Gear, meta: GearMeta) {
	return compressToBase64(stringifyGearMeta(gear, meta));
}

export function gearMetaToEncodedURIComponent(gear: Gear, meta: GearMeta) {
	return compressToEncodedURIComponent(stringifyGearMeta(gear, meta));
}
