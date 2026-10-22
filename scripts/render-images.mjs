// Renders the poster, hero and gallery images from the real 3D scene.
// Usage: pnpm dev (in another terminal), then: node scripts/render-images.mjs [baseUrl]
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3000';
const out = new URL('../public/images/', import.meta.url).pathname;

const shots = [
  { file: 'loft.jpg', unit: 'loft', hotspot: null },
  { file: 'two-bed.jpg', unit: 'two-bed', hotspot: null },
  { file: 'hero.jpg', unit: 'loft', hotspot: 'living', size: [1920, 1080] },
  { file: 'gallery-1.jpg', unit: 'loft', hotspot: 'living' },
  { file: 'gallery-2.jpg', unit: 'two-bed', hotspot: 'dining' },
  { file: 'gallery-3.jpg', unit: 'loft', hotspot: 'floor' },
  { file: 'gallery-4.jpg', unit: 'two-bed', hotspot: 'window' },
  { file: 'gallery-5.jpg', unit: 'loft', hotspot: 'window' },
];

const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
  ],
});

for (const shot of shots) {
  const [width, height] = shot.size ?? [1600, 900];
  const page = await browser.newPage({ viewport: { width, height } });
  // Reduced motion makes the camera jump to the hotspot view, so shots are deterministic.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'load' });
  await page.locator('#tour').scrollIntoViewIfNeeded();
  await page.addStyleTag({
    content: `
      [data-testid="tour-canvas"] ~ *, button[aria-label^="Inspect:"] { display: none !important; }
      [data-testid="tour-canvas"] { position: fixed !important; inset: 0 !important; width: ${width}px !important; height: ${height}px !important; z-index: 9999; opacity: 1 !important; }
      [data-ready] > img { display: none !important; }
    `,
  });
  await page.waitForSelector('[data-testid="tour-canvas"] canvas', { timeout: 120000 });
  if (shot.unit !== 'loft')
    await page.evaluate((id) => document.getElementById(`tab-${id}`)?.click(), shot.unit);
  await page.waitForTimeout(6000);
  if (shot.hotspot) {
    await page.evaluate((id) => {
      const labels = {
        floor: 'Oak flooring',
        living: 'Living area',
        window: 'Window',
        dining: 'Dining area',
      };
      const btn = [...document.querySelectorAll('ul[aria-label="Points of interest"] button')].find(
        (b) => b.textContent?.includes(labels[id] ?? id),
      );
      btn?.click();
    }, shot.hotspot);
    await page.waitForTimeout(5000);
  }
  await page.screenshot({ path: `${out}${shot.file}`, type: 'jpeg', quality: 82 });
  console.log('wrote', shot.file);
  await page.close();
}
await browser.close();
