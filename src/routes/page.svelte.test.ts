import { afterEach, beforeEach, describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
	);
});

afterEach(() => vi.unstubAllGlobals());

describe('/+page.svelte', () => {
	test('아이템 추가 화면으로 이동하는 링크를 표시한다', () => {
		render(Page);
		expect(screen.getAllByRole('link', { name: '아이템 추가' })[0]).toHaveAttribute(
			'href',
			'/gear/search'
		);
	});
});
