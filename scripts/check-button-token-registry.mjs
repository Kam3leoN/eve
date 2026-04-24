import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const tokenScssPath = fileURLToPath(new URL("../src/components/button/styles/_token.scss", import.meta.url));
const registryPath = fileURLToPath(new URL("../src/scss/token-registry/button.tokens.json", import.meta.url));

const scss = readFileSync(tokenScssPath, "utf8");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));

const scssTokens = [...scss.matchAll(/--#\{\$prefix\}-comp-button-[a-z0-9-]+(?=:)/g)].map((m) =>
  m[0].replace("--#{$prefix}", "--{prefix}"),
);
const registryTokens = registry.tokens.map((t) => t.name);

const missingInRegistry = scssTokens.filter((t) => !registryTokens.includes(t));
const unknownInScss = registryTokens.filter((t) => !scssTokens.includes(t));

if (missingInRegistry.length || unknownInScss.length) {
  console.error("Button token registry mismatch.");
  if (missingInRegistry.length) {
    console.error("Missing in registry:");
    for (const token of missingInRegistry) console.error(`- ${token}`);
  }
  if (unknownInScss.length) {
    console.error("Unknown in SCSS:");
    for (const token of unknownInScss) console.error(`- ${token}`);
  }
  process.exit(1);
}

console.log("Button token registry OK.");
