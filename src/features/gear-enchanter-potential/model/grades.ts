import { PotentialGrade } from '@malib/gear';

export const grades = [
	{
		label: '없음',
		value: PotentialGrade.Normal
	},
	{
		label: '레어',
		value: PotentialGrade.Rare
	},
	{
		label: '에픽',
		value: PotentialGrade.Epic
	},
	{
		label: '유니크',
		value: PotentialGrade.Unique
	},
	{
		label: '레전드리',
		value: PotentialGrade.Legendary
	}
] as const;
