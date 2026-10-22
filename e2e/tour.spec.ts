import { test, expect } from './fixtures';

test.describe('landing page', () => {
  test('loads with its main content and no console errors', async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto('/');
    await expect(page).toHaveTitle(/Northlight Residences/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Walk through your home');
    await expect(page.getByRole('heading', { name: 'Step inside.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'See it in person.' })).toBeVisible();
  });

  test('the 3D scene renders and the hotspots work', async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto('/');
    await page.locator('#tour').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-ready="true"]')).toBeVisible({ timeout: 90_000 });
    await expect(page.locator('[data-testid="tour-canvas"] canvas')).toBeVisible();

    // Markers inside the canvas and the keyboard list expose the same hotspots.
    await expect(page.locator('button[aria-label^="Inspect:"]')).toHaveCount(3);

    const flooring = page.getByRole('button', { name: 'Oak flooring', exact: true });
    await flooring.click();
    const card = page.getByRole('region', { name: 'Hotspot details' });
    await expect(card).toContainText('Smoked oak flooring');
    await expect(card).toContainText('HOTSPOT 1 OF 3');
    await expect(flooring).toHaveAttribute('aria-pressed', 'true');

    await card.getByRole('button', { name: 'Close' }).click();
    await expect(card).toContainText('Select a + marker');
  });

  test('switching the residence updates the summary and the booking form', async ({
    page,
    consoleErrors,
  }) => {
    void consoleErrors;
    await page.goto('/');
    await page.locator('#tour').scrollIntoViewIfNeeded();
    await expect(page.getByLabel('Unit A · Loft summary')).toContainText('$286,000');

    await page.getByRole('tab', { name: 'Unit B · Two-bedroom' }).click();
    await expect(page.getByLabel('Unit B · Two-bedroom summary')).toContainText('$412,000');
    await expect(page.locator('[data-ready="true"]')).toBeVisible({ timeout: 90_000 });
    await expect(page.locator('button[aria-label^="Inspect:"]')).toHaveCount(3);
    await expect(page.getByLabel('Preferred residence')).toHaveValue('two-bed');
  });

  test('the booking form shows a demo confirmation', async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto('/');
    await page.getByLabel('Full name').fill('Sam Taylor');
    await page.getByLabel('Email').fill('sam@example.com');
    await page.getByRole('button', { name: 'Request a visit' }).click();
    await expect(page.getByRole('status')).toContainText('Thank you, Sam Taylor');
    await expect(page.getByRole('status')).toContainText('nothing was sent');
  });

  test('reduced motion: selecting a hotspot still works', async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#tour').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-ready="true"]')).toBeVisible({ timeout: 90_000 });
    await page.getByRole('button', { name: 'Panoramic window', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Hotspot details' })).toContainText(
      'Floor-to-ceiling window',
    );
  });

  test('credits list every model with its author', async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto('/');
    await page.getByText('Credits', { exact: true }).click();
    await expect(page.locator('#credits')).toContainText('Mid Century Lounge Chair');
    await expect(page.locator('#credits')).toContainText('Kuutti Siitonen');
  });
});
