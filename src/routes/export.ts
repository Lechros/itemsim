import { stringifyGear, type Gear, validateParseGear } from '@malib/gear';
import { createGearMeta, type GearMeta, type GearSlot } from './gear-store';
import {
	compressToBase64,
	compressToEncodedURIComponent,
	decompressFromBase64,
	decompressFromEncodedURIComponent
} from 'lz-string';

export function stringifyGearMeta(gear: Gear, meta: GearMeta) {
	return stringifyGear(gear) + '|' + JSON.stringify(meta);
}

export function gearMetaToBase64(gear: Gear, meta: GearMeta) {
	return compressToBase64(stringifyGearMeta(gear, meta));
}

export function gearMetaToEncodedURIComponent(gear: Gear, meta: GearMeta) {
	return compressToEncodedURIComponent(stringifyGearMeta(gear, meta));
}

export function parseGearMeta(str: string): GearSlot | null {
	const [gearPart, metaPart] = str.split('|');
	const gear = validateParseGear(gearPart);
	if (gear === null) return null;
	const meta = metaPart ? JSON.parse(metaPart) : createGearMeta();
	return {
		gear,
		meta
	};
}

export function gearMetaFromBase64(str: string) {
	return parseGearMeta(decompressFromBase64(str));
}

export function gearMetaFromEncodedURIComponent(str: string) {
	return parseGearMeta(decompressFromEncodedURIComponent(str));
}
