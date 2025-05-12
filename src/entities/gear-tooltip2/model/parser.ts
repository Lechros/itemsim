export function parseColorString(
	text: string,
	classTable: Record<string, string> = { c: 'gt--orange' }
) {
	text = text.replaceAll(/(\\r)?\\n/g, '\n').replaceAll('\\r', ' ');

	if (!text.includes('#')) {
		return text;
	}

	const result: string[] = [];
	let currentColor: string | undefined = undefined;
	let lastIndex = 0;
	while (true) {
		const nextIndex = text.indexOf('#', lastIndex);
		if (nextIndex === -1) {
			break;
		}

		const type = text[nextIndex + 1];
		const color = type ? classTable[type] : undefined;

		if (color) {
			// Current tag is opening tag
			// Flush the text before the tag
			if (nextIndex > lastIndex) {
				result.push(text.substring(lastIndex, nextIndex));
			}
			// If current color is different from the previous color
			if (currentColor !== color) {
				// Close previous color tag
				if (currentColor !== undefined) {
					result.push('</span>');
				}
				// Open current color tag
				result.push(`<span class="${color}">`);
				currentColor = color;
			} else {
				// If current color is the same as the previous color, just add space
				result.push(' ');
			}
			lastIndex = nextIndex + 2;
		} else {
			// Current tag is closing tag
			// Flush the text before the tag
			if (nextIndex > lastIndex) {
				result.push(text.substring(lastIndex, nextIndex));
			}
			// Close previous color tag
			if (currentColor !== undefined) {
				result.push('</span>');
				currentColor = undefined;
			} else {
				// If there is no opening tag, just add space
				result.push(' ');
			}
			lastIndex = nextIndex + 1;
		}
	}
	// Flush the remaining text
	if (lastIndex < text.length) {
		result.push(text.substring(lastIndex));
		// Close the last color tag
		if (currentColor !== undefined) {
			result.push('</span>');
		}
	}

	return result.join('').trim();
}
