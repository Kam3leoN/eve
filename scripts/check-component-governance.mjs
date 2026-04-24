import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const componentsRoot = path.join(root, 'src', 'components');
const adrRoot = path.join(root, 'docs', 'adr');
const tokenRegistryRoot = path.join(root, 'src', 'scss', 'token-registry');

const componentNames = readdirSync(componentsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const failures = [];

for (const name of componentNames) {
  const dir = path.join(componentsRoot, name);
  const mainTs = path.join(dir, `${name}.ts`);
  if (!existsSync(mainTs)) continue;

  const required = [
    path.join(dir, `${name}.contract.ts`),
    path.join(dir, `${name}.contract.test.ts`),
    path.join(dir, `${name}.a11y.test.ts`),
    path.join(dir, `${name}.visual.test.ts`),
    path.join(dir, `${name}.stability.ts`),
    path.join(dir, `${name}.migrations.json`),
    path.join(tokenRegistryRoot, `${name}.tokens.json`),
    path.join(adrRoot, `ADR-${name}-contract-and-governance.md`),
  ];

  for (const req of required) {
    if (!existsSync(req)) failures.push(req);
  }
}

if (failures.length) {
  console.error('Component governance check failed. Missing files:');
  for (const miss of failures) console.error(`- ${miss}`);
  process.exit(1);
}

console.log('Component governance check OK.');
