export function resultOrFalse<T>(func: (arg: T) => boolean, arg: T | undefined): boolean {
	return arg ? func(arg) : false;
}
