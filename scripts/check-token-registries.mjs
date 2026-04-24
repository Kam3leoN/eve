import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const componentsRoot = path.join(root, 'src', 'components');
const registryRoot = path.join(root, 'src', 'scss', 'token-registry');

const failures = [];

const components = readdirSync(componentsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of components) {
  const tokenScss = path.join(componentsRoot, name, 'styles', '_token.scss');
  const registry = path.join(registryRoot, `${name}.tokens.json`);
  if (!existsSync(tokenScss) || !existsSync(registry)) continue;

  const scss = readFileSync(tokenScss, 'utf8');
  const reg = JSON.parse(readFileSync(registry, 'utf8'));
  const scssTokens = [...scss.matchAll(/--#\{\$prefix\}-comp-[a-z0-9-]+(?=:)/g)].map((m) =>
    m[0].replace('--#{$prefix}', '--{prefix}'),
  );
  const regTokens = (reg.tokens ?? []).map((t) => t.name);

  const missing = scssTokens.filter((t) => !regTokens.includes(t));
  const unknown = regTokens.filter((t) => !scssTokens.includes(t));
  if (missing.length || unknown.length) {
    failures.push({ name, missing, unknown });
  }
}

if (failures.length) {
  console.error('Token registry mismatch:');
  for (const f of failures) {
    console.error(`\\nComponent ${f.name}`);
    for (const t of f.missing) console.error(`- missing in registry: ${t}`);
    for (const t of f.unknown) console.error(`- unknown in scss: ${t}`);
  }
  process.exit(1);
}

console.log('Token registry check OK.');
