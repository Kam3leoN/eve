import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const buttonPath = fileURLToPath(new URL("../src/components/button/button.ts", import.meta.url));
const migrationsPath = fileURLToPath(new URL("../src/components/button/button.migrations.json", import.meta.url));

const src = readFileSync(buttonPath, "utf8");
const migrations = JSON.parse(readFileSync(migrationsPath, "utf8"));

const observedBlockMatch = src.match(/static observedAttributes = \[(.*?)\];/s);
if (!observedBlockMatch) {
  console.error("Unable to locate observedAttributes in button.ts");
  process.exit(1);
}

const observed = [...observedBlockMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const expectedBaseline = [
  'variant',
  'size',
  'disabled',
  'soft-disabled',
  'type',
  'href',
  'target',
  'icon-leading',
  'icon-trailing',
  'aria-label',
  'name',
  'value',
  'form',
  'toggle',
  'pressed',
  'shape',
  'shape-toggle-swap',
  'dir',
];

const removed = expectedBaseline.filter((attr) => !observed.includes(attr));
const allowed = new Set(migrations.removedAttributes ?? []);
const illegal = removed.filter((attr) => !allowed.has(attr));

if (illegal.length) {
  console.error("Button observedAttributes changed without migration entry:");
  for (const attr of illegal) console.error(`- ${attr}`);
  process.exit(1);
}

console.log("Button stability guard OK.");
