export function match(text: string, match: string) {
	let j = 0;
	for (let i = 0; i < text.length && j < match.length; i++) {
		if (text[i] === match[j]) {
			j++;
		}
	}
	return j === match.length;
}
