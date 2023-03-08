import type { Gear } from '@malib/gear';

export function getGearNameColor(gear: Gear): string {
	const diff = gear.diff;
	const up = gear.upgradeCount > 0;

	if (diff < 0) return '--gray';
	if (diff < 6) {
		if (up) return '--orange2';
		else return '--white';
	}
	if (diff < 23) return '--blue';
	if (diff < 40) return '--purple';
	if (diff < 55) return '--orange2';
	if (diff < 70) return '--green';
	return '--red';
}
