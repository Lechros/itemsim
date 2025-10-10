import type { SetItemData } from '$lib/api';

export function createSetItemNameLoader(data?: SetItemData) {
	return (setItemId: number): string => {
		if (!data) return '???';
		return data[setItemId].name || '???';
	};
}
