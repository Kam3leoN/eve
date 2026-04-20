/**
 * Copie eve.min.css et eve.min.js depuis la racine du dépôt (../dist) vers public/eve/.
 * À exécuter avant vite build / dev.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const repoDist = path.join(docsRoot, '..', 'dist');
const targetDir = path.join(docsRoot, 'public', 'eve');
const files = ['eve.min.css', 'eve.min.js'];

fs.mkdirSync(targetDir, { recursive: true });

for (const name of files) {
  const src = path.join(repoDist, name);
  const dst = path.join(targetDir, name);
  if (!fs.existsSync(src)) {
    console.error(
      `[docs] Fichier manquant: ${src}\n` +
        '  Lancez depuis la racine du repo : npm run build',
    );
    process.exit(1);
  }
  fs.copyFileSync(src, dst);
  console.log(`[docs] Copié ${name} -> public/eve/`);
}
