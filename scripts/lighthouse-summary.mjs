// Prints the key Lighthouse metrics from the reports written by `lhci autorun`.
import { readdirSync, readFileSync } from 'node:fs';

const dir = '.lighthouseci';
for (const file of readdirSync(dir).filter((f) => f.startsWith('lhr-') && f.endsWith('.json'))) {
  const lhr = JSON.parse(readFileSync(`${dir}/${file}`, 'utf8'));
  const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, v.score]));
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'speed-index',
    'cumulative-layout-shift',
  ];
  console.log(lhr.finalUrl, scores);
  for (const id of metrics) console.log(`  ${id}: ${lhr.audits[id]?.displayValue}`);
  console.log(`  benchmarkIndex: ${lhr.environment?.benchmarkIndex}`);
}
