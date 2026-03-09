export function indexChoice(weights: number[]): number {
	const total = weights.reduce((acc, weight) => acc + weight, 0);
	const random = Math.random() * total;
	let cumulativeWeight = 0;
	for (let i = 0; i < weights.length; i++) {
		cumulativeWeight += weights[i];
		if (random <= cumulativeWeight) {
			return i;
		}
	}
	return weights.length - 1;
}
