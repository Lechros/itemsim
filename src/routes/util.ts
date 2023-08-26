export function enumValues<T extends Record<keyof T, number>>(obj: T): T[keyof T][] {
	return Object.values(obj).filter(Number.isInteger) as T[keyof T][];
}

export const throttle = (fn: Function, wait = 300) => {
	let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number;
	return function (this: any) {
		const context = this,
			args = arguments;
		if (!inThrottle) {
			fn.apply(context, args);
			lastTime = Date.now();
			inThrottle = true;
		} else {
			clearTimeout(lastFn);
			lastFn = setTimeout(() => {
				if (Date.now() - lastTime >= wait) {
					fn.apply(context, args);
					lastTime = Date.now();
				}
			}, Math.max(wait - (Date.now() - lastTime), 0));
		}
	};
};

export function pickRandomIndex(weights: number[]) {
	const sum = weights.reduce((acc, val) => acc + val, 0);
	let randomValue = Math.random() * sum;
	for (let i = 0; i < weights.length; i++) {
		if (randomValue < weights[i]) return i;
		else randomValue -= weights[i];
	}
	return weights.length - 1;
}
