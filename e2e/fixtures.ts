import { test as base, expect } from '@playwright/test';

/** Collects console errors and uncaught exceptions; the test fails if any appear. */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: async ({ page }, provide) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));
    await provide(errors);
    expect(errors, 'console errors').toEqual([]);
  },
});

export { expect };
