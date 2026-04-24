import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(root, 'dist');
const manifestPath = path.join(distDir, 'custom-elements.json');
const componentsRoot = path.join(root, 'src', 'components');

const componentDirs = readdirSync(componentsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const modules = [];

for (const name of componentDirs) {
  const filePath = path.join(componentsRoot, name, `${name}.ts`);
  try {
    const src = readFileSync(filePath, 'utf8');
    const className = (src.match(/export class (\w+)/) || [])[1];
    if (!className) continue;
    const observedBlock = (src.match(/static observedAttributes = \[(.*?)\];/s) || [])[1] ?? '';
    const attrs = [...observedBlock.matchAll(/'([^']+)'/g)].map((m) => ({ name: m[1], type: 'string' }));
    modules.push({
      path: `src/components/${name}/${name}.ts`,
      declarations: [
        {
          kind: 'class',
          name: className,
          tagName: `lib-${name}`,
          attributes: attrs,
          slots: [{ name: '' }],
          cssParts: [{ name: 'control' }],
          events: [],
        },
      ],
    });
  } catch {
    // skip folders without main component TS
  }
}

const manifest = {
  schemaVersion: '1.0.0',
  readme: 'Generated manifest for Eve components',
  modules,
};

mkdirSync(distDir, { recursive: true });
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Custom Elements manifest generated.');
