export function enumValues<T extends Record<keyof T, number>>(obj: T): T[keyof T][] {
	return Object.values(obj).filter(Number.isInteger) as T[keyof T][];
}
