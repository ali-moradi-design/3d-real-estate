import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

test('the page has no axe violations (WCAG 2 A and AA)', async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto('/');
  await page.locator('#tour').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-ready="true"]')).toBeVisible({ timeout: 90_000 });
  await page.getByRole('button', { name: 'Oak flooring', exact: true }).click();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const summary = results.violations.flatMap((v) =>
    v.nodes.map((n) => `${v.id} | ${n.target.join(' ')} | ${n.any[0]?.message ?? v.help}`),
  );
  expect(summary).toEqual([]);
});
