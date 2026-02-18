import type { Gear } from '@malib/gear';
import {
	Flame,
	Gavel,
	Gem,
	List,
	ListFilter,
	ListFilterPlus,
	Scroll,
	Settings2,
	Star,
	type IconProps
} from 'lucide-svelte';
import type { Component, SvelteComponent } from 'svelte';

export type GearEnchantTab = {
	label: string;
	value: string;
	disabled?: (gear: Gear) => boolean;
	icon?: Component<IconProps> | typeof SvelteComponent<IconProps>;
};

export const tabs: GearEnchantTab[] = [
	{
		label: '관리',
		value: 'default',
		disabled: undefined,
		icon: Settings2
	},
	{
		label: '속성',
		value: 'props',
		disabled: undefined,
		icon: List
	},
	{
		label: '스타포스',
		value: 'starforce',
		disabled: (gear: Gear) => !gear.supportsStarforce,
		icon: Star
	},
	{
		label: '주문서',
		value: 'scroll',
		disabled: (gear: Gear) => !gear.supportsUpgrade,
		icon: Scroll
	},
	{
		label: '추가옵션',
		value: 'bonus',
		disabled: (gear: Gear) => !gear.supportsAddOption,
		icon: Gem
	},
	{
		label: '잠재능력',
		value: 'pot',
		disabled: (gear: Gear) => !gear.supportsPotential,
		icon: ListFilter
	},
	{
		label: '에디셔널 잠재능력',
		value: 'addiPot',
		disabled: (gear: Gear) => !gear.supportsAdditionalPotential,
		icon: ListFilterPlus
	},
	{
		label: '익셉셔널',
		value: 'exceptional',
		disabled: (gear: Gear) => !gear.supportsExceptional,
		icon: Gavel
	},
	{
		label: '소울웨폰',
		value: 'soul',
		disabled: (gear: Gear) => !gear.supportsSoul,
		icon: Flame
	}
] as const;
