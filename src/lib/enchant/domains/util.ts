export function resultOrFalse<T>(
	func: (arg: T, ...args: never[]) => boolean,
	arg: T | undefined,
	...args: unknown[]
): boolean {
	if (args) {
		return arg ? func(arg, ...(args as never[])) : false;
	}
	return arg ? func(arg) : false;
}
