import type { ReadonlyGear } from '@malib/gear';
import { showEtcScrollTab } from './etcScroll';
import { showSpellTraceTab } from './spellTrace';

export const tabs = [
	{
		label: '주문의 흔적',
		value: 'spellTrace',
		show: (gear: ReadonlyGear) => showSpellTraceTab(gear)
	},
	{
		label: '혼돈의 주문서',
		value: 'chaos',
		show: () => true
	},
	{
		label: '기타 주문서',
		value: 'etc',
		show: (gear: ReadonlyGear) => showEtcScrollTab(gear)
	}
];
