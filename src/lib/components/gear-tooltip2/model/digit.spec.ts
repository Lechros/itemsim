import { expect, test } from 'vitest';
import { splitKoreanNumber } from './digit';

test.each([
	[82, ['8', '2']],
	[100000, ['1', '0', '만']],
	[100000000, ['1', '억']],
	[100000001, ['1', '억', '1']],
	[123456789, ['1', '억', '2', '3', '4', '5', '만', '6', '7', '8', '9']]
])('splitKoreanNumber(%i) should return %s', (number, expected) => {
	expect(splitKoreanNumber(number)).toEqual(expected);
});
