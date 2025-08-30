export function splitKoreanNumber(number: number): string[] {
	const units = ['', '만', '억'];
	const unit = 10000;
	const result = [];

	for (let i = units.length - 1; i >= 0; i--) {
		const part = Math.floor(number / Math.pow(unit, i)) % unit;
		if (part > 0) {
			result.push(...part.toString().split(''));
			if (units[i]) {
				result.push(units[i]);
			}
		}
	}

	return result;
}
