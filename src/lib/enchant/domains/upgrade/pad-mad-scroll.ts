import { type Scroll, GearPropType } from '@malib/gear';

export function getPadMadScroll(pad: number, mad: number): Scroll {
	return {
		name: '',
		option: new Map([
			[GearPropType.incPAD, pad],
			[GearPropType.incMAD, mad]
		])
	};
}
