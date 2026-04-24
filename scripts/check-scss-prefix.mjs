import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../src", import.meta.url));
const BAD_PREFIX_REGEX = /--#\{\$prefix\}(?=[A-Za-z])/g;

function collectScssFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const st = statSync(abs);
    if (st.isDirectory()) {
      collectScssFiles(abs, out);
      continue;
    }
    if (abs.endsWith(".scss")) out.push(abs);
  }
  return out;
}

const files = collectScssFiles(ROOT);
const violations = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const matches = [...src.matchAll(BAD_PREFIX_REGEX)];
  if (matches.length === 0) continue;
  for (const m of matches) {
    const idx = m.index ?? 0;
    const before = src.slice(0, idx);
    const line = before.split("\n").length;
    violations.push({ file, line });
  }
}

if (violations.length > 0) {
  console.error("Erreur prefix SCSS: '--#{$prefix}-...' est obligatoire.");
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line}`);
  }
  process.exit(1);
}

console.log("Check prefix SCSS OK.");
