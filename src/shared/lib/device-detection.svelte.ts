import { browser } from '$app/environment';

/**
 * pointer: fine 미디어 쿼리를 사용해서 정밀한 포인팅 장치(마우스 등)가 있는지 감지
 * 모바일/터치 기기는 일반적으로 pointer: coarse를 가짐
 */
export function createPointerDetection() {
	let isPointerFine = $state(true); // 기본값은 true (SSR 대응)

	$effect(() => {
		if (browser && window.matchMedia) {
			const mediaQuery = window.matchMedia('(pointer: fine)');

			// 초기값 설정
			isPointerFine = mediaQuery.matches;

			// 미디어 쿼리 변경 감지 (사용자가 마우스를 연결/해제하는 경우)
			const handleChange = (e: MediaQueryListEvent) => {
				isPointerFine = e.matches;
			};

			mediaQuery.addEventListener('change', handleChange);

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});

	return {
		get isPointerFine() {
			return isPointerFine;
		},
	};
}
