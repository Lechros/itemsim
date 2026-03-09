import html2canvas from 'html2canvas-pro';
import { toCanvas, toPng } from 'html-to-image';

/**
 * V1: 두 패스 렌더링 (배경/그래픽 → 텍스트)으로 폰트·텍스트 깨짐 방지
 */
export async function captureV1(tooltip: HTMLDivElement): Promise<string> {
	try {
		tooltip.classList.add('gt--hidden-text');
		const cv1 = await toCanvas(tooltip, { cacheBust: true, skipFonts: true });
		tooltip.classList.remove('gt--hidden-text');

		tooltip.classList.add('gt--hidden-except-text');
		const cv2 = await html2canvas(tooltip, {
			canvas: cv1,
			backgroundColor: 'transparent'
		});
		return cv2.toDataURL('image/png');
	} finally {
		tooltip.classList.remove('gt--hidden-text');
		tooltip.classList.remove('gt--hidden-except-text');
	}
}

/**
 * V2: 단일 패스 PNG 캡처
 */
export async function captureV2(tooltip: HTMLDivElement): Promise<string> {
	return toPng(tooltip, { cacheBust: true });
}

export type CaptureStrategy = (tooltip: HTMLDivElement) => Promise<string>;

export const strategies: Record<'1' | '2', CaptureStrategy> = {
	1: captureV1,
	2: captureV2
};
