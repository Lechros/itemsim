import { GearType } from '@malib/gear';

import type { Gear } from '@malib/gear';
import { exceptionalHammerData } from './hammerData';

export function getExceptionalHammer(gear: Gear) {
	switch (gear.type) {
		case GearType.belt:
			return exceptionalHammerData['익셉셔널 해머 (벨트)'];
		case GearType.earrings:
			return exceptionalHammerData['익셉셔널 해머 (귀고리)'];
		case GearType.faceAccessory:
			return exceptionalHammerData['익셉셔널 해머 (얼굴장식)'];
		case GearType.eyeAccessory:
			return exceptionalHammerData['익셉셔널 해머 (눈장식)'];
		default:
			return null;
	}
}
