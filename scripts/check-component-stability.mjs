import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const componentsRoot = path.join(root, 'src', 'components');

const failures = [];

const components = readdirSync(componentsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of components) {
  const tsPath = path.join(componentsRoot, name, `${name}.ts`);
  const stabilityPath = path.join(componentsRoot, name, `${name}.stability.ts`);
  const migrationsPath = path.join(componentsRoot, name, `${name}.migrations.json`);
  if (!existsSync(tsPath) || !existsSync(stabilityPath) || !existsSync(migrationsPath)) continue;

  const src = readFileSync(tsPath, 'utf8');
  const stability = readFileSync(stabilityPath, 'utf8');
  const migrations = JSON.parse(readFileSync(migrationsPath, 'utf8'));

  const observedBlock = (src.match(/static observedAttributes = \[(.*?)\];/s) || [])[1] ?? '';
  const observed = [...observedBlock.matchAll(/'([^']+)'/g)].map((m) => m[1]);

  const attrsBlock = (stability.match(/attributes:\s*\{([\s\S]*?)\}\s*as Record/) || [])[1] ?? '';
  const stabilized = [...attrsBlock.matchAll(/(?:'([^']+)'|([a-zA-Z0-9-]+))\s*:/g)].map(
    (m) => m[1] ?? m[2],
  );

  const missingStatuses = observed.filter((a) => !stabilized.includes(a));
  const removed = migrations.removedAttributes ?? [];
  const invalidRemoved = removed.filter((a) => observed.includes(a));

  if (missingStatuses.length || invalidRemoved.length) {
    failures.push({ name, missingStatuses, invalidRemoved });
  }
}

if (failures.length) {
  console.error('Component stability check failed.');
  for (const f of failures) {
    console.error(`\\nComponent ${f.name}`);
    for (const a of f.missingStatuses) console.error(`- missing stability status: ${a}`);
    for (const a of f.invalidRemoved) console.error(`- removedAttributes still present: ${a}`);
  }
  process.exit(1);
}

console.log('Component stability check OK.');
