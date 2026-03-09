export function validateItemTag(itemTag: string): string | undefined {
	const length = getMapleLength(itemTag);
	if (length < 4 || length > 12) {
		return '4자 이상 12자 이하로 입력해주세요. 한글은 2자로 계산되어요.';
	}
	const regex = /^[a-zA-Z0-9가-힣]+$/;
	if (!regex.test(itemTag)) {
		return '영문자, 숫자, 한글만 사용할 수 있어요.';
	}
	return undefined;
}

function getMapleLength(itemTag: string): number {
	let length = 0;
	for (const char of itemTag) {
		if ('가' <= char && char <= '힣') {
			length += 2;
		} else {
			length += 1;
		}
	}
	return length;
}
