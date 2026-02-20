import lzs from 'lz-string';
import typia from 'typia';
import type { ExportPayload } from './types';

/**
 * 직렬화된 페이로드 문자열을 파싱하여 페이로드 객체를 반환합니다.
 * @param payloadStr 직렬화된 페이로드 문자열
 * @returns 파싱된 페이로드 객체
 * @throws {TypeError} 파싱에 실패한 경우
 * @throws {TypeError} 날짜 문자열이 유효하지 않은 경우
 */
export function parseExportPayload(payloadStr: Uint8Array<ArrayBuffer>): ExportPayload {
	const decompressed = lzs.decompressFromUint8Array(payloadStr);
	const parsed = JSON.parse(decompressed);
	if (!typia.is<ExportPayload>(parsed)) {
		throw new TypeError('Invalid export payload');
	}
	const payload = parsed;
	// Validate date strings
	payload.items.forEach((item) => {
		if ('createdAt' in item && typeof item.createdAt === 'string') {
			new Date(item.createdAt);
		}
		if ('updatedAt' in item && typeof item.updatedAt === 'string') {
			new Date(item.updatedAt);
		}
	});
	return payload;
}
