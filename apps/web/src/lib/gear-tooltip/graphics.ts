import type { Gear } from '@malib/gear';

export function getGearNameColor(gear: Gear) {
	const diff = gear.diff;
	const up = gear.upgradeCount > 0;

	if (diff < 0) return 'gray';
	if (diff < 6) {
		if (up) return 'orange2';
		else return 'white';
	}
	if (diff < 23) return 'blue';
	if (diff < 40) return 'purple';
	if (diff < 55) return 'orange2';
	if (diff < 70) return 'green';
	return 'red';
}

export function parseColorString(text: string): string {
	return text
		.replaceAll(/(\\r)?\\n/g, '\n')
		.replaceAll(/#c(.+?)#(?![c$gr])/g, `<span class="gt--text--orange">$1</span>`)
		.replaceAll(/\$(.+?)#(?![c$gr])/g, `<span class="gt--text--blue">$1</span>`)
		.replaceAll(/#g(.+?)#(?![c$gr])/g, `<span class="gt--text--green">$1</span>`)
		.replaceAll(/#r(.+?)#(?![c$gr])/g, `<span class="gt--text--red">$1</span>`)
		.replaceAll(/#p(.+?)#(?![c$gr])/g, `<span class="gt--text--purple2">$1</span>`)
		.replaceAll(/#o(.+?)#(?![c$gr])/g, `<span class="gt--text--orange2">$1</span>`)
		.replaceAll(/#(c|\$|g|r|p|o)?/g, '');
}
