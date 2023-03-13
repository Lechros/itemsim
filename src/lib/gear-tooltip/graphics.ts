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

export function parseColorString(
	text: string,
	colorClass: Record<'c' | 'g' | '$' | 'r', string>
): string {
	return text
		.replaceAll(/#c(.+?)#(?![c$gr])/g, `<span class="${colorClass['c']}">$1</span>`)
		.replaceAll(/\$(.+?)#(?![c$gr])/g, `<span class="${colorClass['$']}">$1</span>`)
		.replaceAll(/#g(.+?)#(?![c$gr])/g, `<span class="${colorClass['g']}">$1</span>`)
		.replaceAll(/#r(.+?)#(?![c$gr])/g, `<span class="${colorClass['r']}">$1</span>`)
		.replaceAll(/#(c|\$|g|r)?/g, '');
}
