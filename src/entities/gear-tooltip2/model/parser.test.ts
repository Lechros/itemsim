import { describe, expect, it } from 'vitest';
import { parseColorString } from './parser';

describe('parseColorString', () => {
	const classTable = { c: 'orange', d: 'blue', $r: 'red' };

	it('should return string as is if no #c is found', () => {
		const input = '진한 악몽의 힘이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(input);
	});

	it('should convert #c to span with class', () => {
		const input = '#c진한# 악몽의 힘이 담겨있다.';
		const expected = '<span class="orange">진한</span> 악몽의 힘이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should ignore # without opening tag', () => {
		const input = '#진한# 악몽의 #힘이 담겨있다.';
		const expected = '진한 악몽의 힘이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should ignore multiple #c without closing tag', () => {
		const input = '#c진한 악몽의 #c힘이# 담겨있다.';
		const expected = '<span class="orange">진한 악몽의 힘이</span> 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should convert multiple #c to spans with class', () => {
		const input = '#c진한# 악몽의 #c힘이# 담겨있다.';
		const expected =
			'<span class="orange">진한</span> 악몽의 <span class="orange">힘이</span> 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should close #c first then open #d', () => {
		const input = '#c진한 악몽의 #d힘이# 담겨있다.';
		const expected =
			'<span class="orange">진한 악몽의 </span><span class="blue">힘이</span> 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should insert space in between #c and text', () => {
		const input = '진한#c악몽의# 힘이 담겨있다.';
		const expected = '진한<span class="orange">악몽의</span> 힘이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should insert space in between # and text', () => {
		const input = '진한 #c악몽의#힘이 담겨있다.';
		const expected = '진한 <span class="orange">악몽의</span>힘이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should handle unclosed tags', () => {
		const input = '#c진한 악몽의 힘이 담겨있다.';
		const expected = '<span class="orange">진한 악몽의 힘이 담겨있다.</span>';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});

	it('should handle #$r', () => {
		const input = '진한 #$r악몽의 힘#이 담겨있다.';
		const expected = '진한 <span class="red">악몽의 힘</span>이 담겨있다.';

		const actual = parseColorString(input, classTable).replaceAll(/\s+/g, ' ');

		expect(actual).toBe(expected);
	});
});
