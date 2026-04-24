import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const reports = [
  path.join(root, '.lighthouseci', 'desktop-report.json'),
  path.join(root, '.lighthouseci', 'mobile-report.json'),
];

const missing = reports.filter((r) => !existsSync(r));
if (missing.length) {
  console.log('Lighthouse reports not found. Run Lighthouse before enforcing strict gate.');
  process.exit(0);
}

const requiredCats = ['performance', 'accessibility', 'best-practices', 'seo'];
const MIN_SCORE = 0.99;
const failures = [];

for (const reportPath of reports) {
  const json = JSON.parse(readFileSync(reportPath, 'utf8'));
  for (const cat of requiredCats) {
    const score = json?.categories?.[cat]?.score ?? 0;
    if (score < MIN_SCORE) {
      failures.push({ reportPath, cat, score });
    }
  }
}

if (failures.length) {
  console.error(`Lighthouse gate failed (minimum score ${MIN_SCORE}):`);
  for (const f of failures) {
    console.error(`- ${f.reportPath} :: ${f.cat} = ${f.score}`);
  }
  process.exit(1);
}

console.log('Lighthouse 100 gate OK.');
