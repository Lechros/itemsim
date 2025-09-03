import { GearTrade } from '@malib/gear';

export const tradeTypes = [
	{
		label: '교환 가능',
		value: GearTrade.Tradeable
	},
	{
		label: '교환 불가',
		value: GearTrade.TradeBlock
	},
	{
		label: '장착 시 교환 불가',
		value: GearTrade.EquipTradeBlock
	},
	{
		label: '1회 교환 가능',
		value: GearTrade.TradeOnce
	}
];
