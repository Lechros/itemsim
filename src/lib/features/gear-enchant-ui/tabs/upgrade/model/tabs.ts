import type { ReadonlyGear } from '@malib/gear';
import { showEtcScrollTab } from './etcScroll';
import { showSpellTraceTab } from './spellTrace';

export const tabs = [
	{
		label: '주문의 흔적',
		value: 'spellTrace',
		show: (gear: ReadonlyGear) => showSpellTraceTab(gear),
		iconId: '4001832'
	},
	{
		label: '혼돈의 주문서',
		value: 'chaos',
		show: () => true,
		iconId: '2049100'
	},
	{
		label: '기타 주문서',
		value: 'etc',
		show: (gear: ReadonlyGear) => showEtcScrollTab(gear),
		iconId: '5530123'
	}
];
