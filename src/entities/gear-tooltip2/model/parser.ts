export function parseColorString(text: string, classTable: Record<string, string>) {
	text = normalizeText(text);
	if (!text.includes('#')) {
		return text;
	}

	const tokens = parseColorStringToTokens(text);
	const html = buildHtml(tokens, classTable);
	return html;
}

export function tokenizeColorString(text: string, classTable: Record<string, string>) {
	text = normalizeText(text);

	const tokens = parseColorStringToTokens(text);
	const coloredTokens = toColoredTokens(tokens, classTable);
	return coloredTokens;
}

function normalizeText(text: string): string {
	return text.replaceAll(/(\\r)?\\n/g, '\n').replaceAll('\\r', ' ');
}

function parseColorStringToTokens(text: string): Token[] {
	const tokens: Token[] = [];
	let openedKey: string | undefined = undefined;
	let searchStartIndex = 0;
	while (true) {
		const tagIndex = text.indexOf('#', searchStartIndex);
		if (tagIndex === -1) {
			break;
		}

		const tag = parseTag(text, tagIndex);

		// Flush the text before the tag
		if (tagIndex > searchStartIndex) {
			tokens.push({ type: 'text', text: text.substring(searchStartIndex, tagIndex) });
		}
		if (tag.isOpen) {
			// If opened key is different from the current key
			if (openedKey !== tag.key) {
				// Close the key block
				if (openedKey !== undefined) {
					tokens.push({ type: 'close' });
				}
				// Open current key block
				tokens.push({ type: 'open', key: tag.key });
				openedKey = tag.key;
			}
		} else {
			// If there is opened key block
			if (openedKey !== undefined) {
				// Close the key block
				tokens.push({ type: 'close' });
				openedKey = undefined;
			}
		}
		searchStartIndex = tag.endIndex;
	}
	// Flush the remaining text
	if (searchStartIndex < text.length) {
		tokens.push({ type: 'text', text: text.substring(searchStartIndex) });
		// Close the last key block
		if (openedKey !== undefined) {
			tokens.push({ type: 'close' });
		}
	}

	return tokens;
}

function buildHtml(tokens: Token[], classTable: Record<string, string>): string {
	const result: string[] = [];
	let skipNextClose = false;
	for (const token of tokens) {
		switch (token.type) {
			case 'text':
				result.push(token.text);
				break;
			case 'open':
				if (classTable[token.key]) {
					result.push(`<span class="${classTable[token.key]}">`);
				} else {
					result.push(token.key);
					skipNextClose = true;
				}
				break;
			case 'close':
				if (skipNextClose) {
					skipNextClose = false;
				} else {
					result.push('</span>');
				}
				break;
		}
	}
	return result.join('').trim();
}

function toColoredTokens(tokens: Token[], classTable: Record<string, string>): ColoredToken[] {
	const result: ColoredToken[] = [];
	let color: string | undefined = undefined;
	for (const token of tokens) {
		switch (token.type) {
			case 'text':
				result.push({ text: token.text, color });
				break;
			case 'open':
				color = classTable[token.key];
				break;
			case 'close':
				color = undefined;
				break;
		}
	}
	return result;
}

function parseTag(text: string, index: number): Tag {
	const firstKeyChar = text[index + 1];
	if (firstKeyChar === '$') {
		return {
			isOpen: true,
			key: text.substring(index + 1, index + 3),
			endIndex: index + 3
		};
	} else if ('a' <= firstKeyChar && firstKeyChar <= 'z') {
		return {
			isOpen: true,
			key: firstKeyChar,
			endIndex: index + 2
		};
	} else {
		return {
			isOpen: false,
			endIndex: index + 1
		};
	}
}

type Token =
	| {
			type: 'text';
			text: string;
	  }
	| {
			type: 'open';
			key: string;
	  }
	| {
			type: 'close';
	  };

export type ColoredToken = {
	text: string;
	color?: string;
};

type Tag =
	| {
			isOpen: true;
			key: string;
			endIndex: number;
	  }
	| {
			isOpen: false;
			endIndex: number;
	  };
