/**
 * base URL의 path를 유지한 채 path를 이어붙인 URL을 반환합니다.
 */
export function join(base: string, path: string): string {
	const baseTrimmed = base.replace(/\/$/, '');
	const pathNormalized = path.startsWith('/') ? path : `/${path}`;
	return `${baseTrimmed}${pathNormalized}`;
}
