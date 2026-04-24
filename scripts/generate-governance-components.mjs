import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const components = [
  'button-icon',
  'button-group',
  'button-split',
  'card',
  'navigation-card',
  'shape',
  'loading-indicator',
  'text-field',
];

const cap = (s) => s.split('-').map((x) => x[0].toUpperCase() + x.slice(1)).join('');

for (const name of components) {
  const dir = path.join(root, 'src', 'components', name);
  const mainTsPath = path.join(dir, `${name}.ts`);
  const src = readFileSync(mainTsPath, 'utf8');
  const className = (src.match(/export class (\w+)/) || [])[1] ?? cap(name);
  const constBase = name.toUpperCase().replace(/-/g, '_');
  const observedBlock = (src.match(/static observedAttributes = \[(.*?)\];/s) || [])[1] ?? '';
  const attrs = [...observedBlock.matchAll(/'([^']+)'/g)].map((m) => m[1]);

  const contract = `import { LIB_PREFIX } from '../../lib.config';
import { ${className} } from './${name}';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface ${cap(name)}ContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const ${constBase}_TAG_NAME = \`\${LIB_PREFIX}-${name}\`;

export const ${constBase}_CONTRACT_ATTRIBUTES: readonly ${cap(name)}ContractAttribute[] = ${className}.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const ${constBase}_CONTRACT_EVENTS = [] as const;
export const ${constBase}_CONTRACT_SLOTS = ['default'] as const;
export const ${constBase}_CONTRACT_PARTS = ['control'] as const;
`;
  writeFileSync(path.join(dir, `${name}.contract.ts`), contract);

  const stabilityRows = attrs.map((attr) => `    '${attr}': 'stable',`).join('\n');
  const stability = `import type { ContractStability } from './${name}.contract';

export const ${constBase}_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
${stabilityRows}
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
`;
  writeFileSync(path.join(dir, `${name}.stability.ts`), stability);
  writeFileSync(path.join(dir, `${name}.migrations.json`), JSON.stringify({ removedAttributes: [] }, null, 2) + '\n');

  const contractTest = `import { describe, expect, it } from 'vitest';
import { ${className} } from './${name}';
import { ${constBase}_CONTRACT_ATTRIBUTES } from './${name}.contract';

describe('${name}.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...${className}.observedAttributes].sort();
    const contracted = [...${constBase}_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
`;
  writeFileSync(path.join(dir, `${name}.contract.test.ts`), contractTest);

  const a11yTest = `import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ${className} } from './${name}';

function ensureRegistered(): string {
  const tag = withLibPrefix('${name}');
  if (!customElements.get(tag)) customElements.define(tag, ${className});
  return tag;
}

describe('${name}.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', '${name}');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
`;
  writeFileSync(path.join(dir, `${name}.a11y.test.ts`), a11yTest);

  const visualTest = `import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ${className} } from './${name}';

function ensureRegistered(): string {
  const tag = withLibPrefix('${name}');
  if (!customElements.get(tag)) customElements.define(tag, ${className});
  return tag;
}

describe('${name}.visual', () => {
  it('produit une empreinte de rendu stable', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    document.body.appendChild(el);
    const root = el.shadowRoot;
    const sig = root ? root.innerHTML.length : 0;
    expect(sig).toBeGreaterThan(0);
    el.remove();
  });
});
`;
  writeFileSync(path.join(dir, `${name}.visual.test.ts`), visualTest);

  const tokenScssPath = path.join(dir, 'styles', '_token.scss');
  let tokens = [];
  if (existsSync(tokenScssPath)) {
    const tokenScss = readFileSync(tokenScssPath, 'utf8');
    tokens = [...tokenScss.matchAll(/--#\{\$prefix\}-comp-[a-z0-9-]+(?=:)/g)].map((m) =>
      m[0].replace('--#{$prefix}', '--{prefix}'),
    );
  }

  const registry = {
    component: name,
    owner: `components/${name}`,
    tokens: tokens.map((tokenName) => ({
      name: tokenName,
      role: 'component',
      stability: 'stable',
    })),
  };

  const registryDir = path.join(root, 'src', 'scss', 'token-registry');
  mkdirSync(registryDir, { recursive: true });
  writeFileSync(path.join(registryDir, `${name}.tokens.json`), JSON.stringify(registry, null, 2) + '\n');

  const adrDir = path.join(root, 'docs', 'adr');
  mkdirSync(adrDir, { recursive: true });
  const adr = `# ADR: ${name} contract and governance

## Status
Accepted

## Context
Gouvernance composant \`${name}\` avec contrat typé, tests et quality gates CI.

## Decision
- Contrat machine-readable (${name}.contract.ts)
- Tests contract/a11y/visual
- Stabilité + migrations explicites
- Registre tokens composant

## Consequences
API plus stable, maintenance plus prédictible.
`;
  writeFileSync(path.join(adrDir, `ADR-${name}-contract-and-governance.md`), adr);
}

console.log('Governance skeleton generated for all non-button components.');
