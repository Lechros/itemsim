import { expect, test } from '@playwright/test';

test('빈 인벤토리에서 아이템 검색 화면으로 이동한다', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('인벤토리가 비어있어요')).toBeVisible();
	await page.getByRole('link', { name: '아이템 추가' }).first().click();
	await expect(page).toHaveURL(/\/gear\/search$/);
	await expect(page.getByRole('textbox').first()).toBeVisible();
});
