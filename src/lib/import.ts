import { createGearMeta, type GearInfo } from '$lib/inventory/stores/gear-store';
import { validateParseGear } from '@malib/gear';
import { decompressFromBase64, decompressFromEncodedURIComponent } from 'lz-string';

export function parseGearMeta(str: string): GearInfo | null {
	try {
		const [gearPart, metaPart] = str.split('|');
		const gear = validateParseGear(gearPart);
		if (gear === null) return null;
		const meta = metaPart ? JSON.parse(metaPart) : createGearMeta();
		return {
			gear,
			meta
		};
	} catch {
		return null;
	}
}

export function gearMetaFromBase64(str: string) {
	return parseGearMeta(decompressFromBase64(str));
}

export function gearMetaFromEncodedURIComponent(str: string) {
	return parseGearMeta(decompressFromEncodedURIComponent(str));
}
