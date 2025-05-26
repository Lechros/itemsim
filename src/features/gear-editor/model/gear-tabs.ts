import { Gear } from '@malib/gear';

export type GearTab = {
	label: string;
	value: string;
	disabled?: (gear: Gear) => boolean;
};

export const gearTabs: GearTab[] = [
	{
		label: '관리',
		value: 'default',
		disabled: undefined
	},
	{
		label: '속성',
		value: 'props',
		disabled: undefined
	},
	{
		label: '스타포스',
		value: 'starforce',
		disabled: (gear: Gear) => !gear.supportsStarforce
	},
	{
		label: '주문서',
		value: 'scroll',
		disabled: (gear: Gear) => !gear.supportsUpgrade
	},
	{
		label: '추가옵션',
		value: 'bonus',
		disabled: (gear: Gear) => !gear.supportsAddOption
	},
	{
		label: '잠재능력',
		value: 'pot',
		disabled: (gear: Gear) => !gear.supportsPotential
	},
	{
		label: '에디셔널 잠재능력',
		value: 'addiPot',
		disabled: (gear: Gear) => !gear.supportsAdditionalPotential
	},
	{
		label: '익셉셔널',
		value: 'exceptional',
		disabled: (gear: Gear) => !gear.supportsExceptional
	},
	{
		label: '소울웨폰',
		value: 'soul',
		disabled: (gear: Gear) => !gear.supportsSoul
	}
] as const;
