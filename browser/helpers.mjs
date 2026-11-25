// Test-only helpers for callers using a reviewed ops-ui revision and locked Playwright.
import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const tags = ['wcag2a', 'wcag2aa', 'wcag21aa'];
export async function assertAccessible(page) {
  const result = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(result.violations).toEqual([]);
}

export function observeBrowserErrors(page) {
  const errors = [];
  const pageError = error => errors.push('pageerror: ' + error.message);
  const consoleError = message => {
    if (message.type() === 'error') errors.push('console: ' + message.text());
  };
  page.on('pageerror', pageError);
  page.on('console', consoleError);
  return {
    assertClean() { expect(errors).toEqual([]); },
    dispose() {
      page.off('pageerror', pageError);
      page.off('console', consoleError);
    }
  };
}

export async function assertNoHorizontalOverflow(page) {
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth
  }));
  expect(sizes.viewport).toBeGreaterThan(0);
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport + 1);
}

export async function assertMainNavigation(page, { path, name }) {
  const response = await page.goto(path);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('main')).toBeVisible();
  if (name) await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
}
