import { GearCapability, type Gear } from '@malib/gear';

export function getDisplayMaxStar(gear: Gear) {
	if (gear.attributes.canStarforce === GearCapability.Fixed) {
		return gear.star;
	}
	return gear.maxStar;
}
