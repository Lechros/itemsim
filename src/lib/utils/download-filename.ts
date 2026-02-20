/**
 * 다운로드 파일명을 생성합니다. 날짜 + payload SHA-1 앞 8자 + 확장자.
 * 동일 내용이면 동일 파일명이 되어 같은 날 재다운로드 시 덮어쓰기됩니다.
 */
export async function buildDownloadFilename(
	payload: Uint8Array<ArrayBuffer>,
	extension: string
): Promise<string> {
	const date = new Date().toISOString().split('T')[0].split('-').join('');
	const hashBuffer = await crypto.subtle.digest('SHA-1', payload);
	const hash = [...new Uint8Array(hashBuffer)]
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	return `${date}_${hash.slice(0, 8)}.${extension}`;
}
