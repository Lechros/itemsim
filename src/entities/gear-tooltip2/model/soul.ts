import type { SoulOption } from '@malib/gear';

export function getSoulOptionString(type: keyof SoulOption, value: number): string {
	if (value !== 0) {
		switch (type) {
			case 'str':
				return `STR +${value}`;
			case 'dex':
				return `DEX +${value}`;
			case 'int':
				return `INT +${value}`;
			case 'luk':
				return `LUK +${value}`;
			case 'strRate':
				return `STR +${value}%`;
			case 'dexRate':
				return `DEX +${value}%`;
			case 'intRate':
				return `INT +${value}%`;
			case 'lukRate':
				return `LUK +${value}%`;
			case 'maxHp':
				return `최대 HP +${value}`;
			case 'maxMp':
				return `최대 MP +${value}`;
			case 'attackPower':
				return `공격력 +${value}`;
			case 'magicPower':
				return `마력 +${value}`;
			case 'attackPowerRate':
				return `공격력 +${value}%`;
			case 'magicPowerRate':
				return `마력 +${value}%`;
			case 'criticalRate':
				return `크리티컬 확률 +${value}%`;
			case 'bossDamage':
				return `보스 몬스터 데미지 +${value}%`;
			case 'ignoreMonsterArmor':
				return `몬스터 방어율 무시 +${value}%`;
		}
	}
	return '';
}
