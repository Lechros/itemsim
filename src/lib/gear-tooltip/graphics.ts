import type { Gear } from '@malib/gear';

export function getGearNameColor(gear: Gear): string {
	const diff = gear.diff;
	const up = gear.upgradeCount > 0;

	if (diff < 0) return '--gear-gray';
	if (diff < 6) {
		if (up) return '--gear-orange2';
		else return '--gear-white';
	}
	if (diff < 23) return '--gear-blue';
	if (diff < 40) return '--gear-purple';
	if (diff < 55) return '--gear-orange2';
	if (diff < 70) return '--gear-green';
	return '--gear-red';
}
