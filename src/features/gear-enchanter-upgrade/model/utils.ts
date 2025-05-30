export function splitHalf<T>(array: T[] | readonly T[]) {
	const half = Math.ceil(array.length / 2);
	return [array.slice(0, half), array.slice(half)];
}

export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
