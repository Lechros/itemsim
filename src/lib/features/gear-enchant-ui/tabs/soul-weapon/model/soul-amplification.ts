import { PotentialGrade, type Gear } from '@malib/gear';
import { getGradeSoulPotentialDatas } from '../../potential/model/potential';

export function setSoulAmplification(gear: Gear, level: number) {
	if (!gear.supportsSoulAmplification) return;
	if (!Number.isInteger(level) || level < 0 || level > 4) return;
	const previousLevel = gear.soulAmplificationLevel;
	const previousGrade = gear.soulPotentialGrade;
	const previousPotentials = gear.soulPotentials;
	if (level > previousLevel) {
		while (gear.soulAmplificationLevel < level && gear.canApplySoulAmplification) {
			gear.applySoulAmplification();
		}
	} else if (gear.data.soulWeapon && level < gear.soulAmplificationLevel) {
		gear.data.soulWeapon.amplificationLevel = level;
	}
	if (gear.soulAmplificationLevel === previousLevel || !gear.soulAmplificationActive) return;
	const grade = previousGrade || gear.soulPotentialGrade || PotentialGrade.Rare;
	const defaults = getGradeSoulPotentialDatas(gear, grade);
	const potentials = Array.from({ length: 3 }, (_, index) => {
		const potential = previousPotentials[index];
		if (!potential) {
			const first = defaults[0];
			return { ...first, option: { ...first.option } };
		}
		return (
			getGradeSoulPotentialDatas(gear, potential.grade).find((p) => p.id === potential.id) ??
			potential
		);
	});
	gear.setSoulPotential(grade, potentials);
}
