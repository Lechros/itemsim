export function splitHalf<T>(array: T[] | readonly T[]) {
	const half = Math.ceil(array.length / 2);
	return [array.slice(0, half), array.slice(half)];
}

export function padRight<T>(array: T[], length: number, value: (index: number) => T) {
	const result = array.concat(Array(length - array.length));
	for (let i = array.length; i < result.length; i++) {
		result[i] = value(i);
	}
	return result;
}
