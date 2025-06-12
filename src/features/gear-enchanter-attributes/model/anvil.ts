import { GearType, isShield, isWeapon, type ReadonlyGear } from '@malib/gear';

export function isShapeChangeableGear(gear: ReadonlyGear) {
	if (isWeapon(gear.type) || gear.type === GearType.katara || isShield(gear.type)) {
		return true;
	}
	switch (gear.type) {
		case GearType.cap:
		case GearType.faceAccessory:
		case GearType.eyeAccessory:
		case GearType.earrings:
		case GearType.coat:
		case GearType.longcoat:
		case GearType.pants:
		case GearType.shoes:
		case GearType.glove:
		case GearType.cape:
		case GearType.medal:
			return true;
		default:
			return false;
	}
}
