/**
 * GitHub Pages : les routes SPA doivent servir index.html pour les chemins profonds.
 * Duplique dist/index.html vers dist/404.html après le build Vite.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

if (!fs.existsSync(indexHtml)) {
  console.error('[docs] dist/index.html introuvable après build.');
  process.exit(1);
}
fs.copyFileSync(indexHtml, notFoundHtml);
console.log('[docs] dist/404.html copié depuis index.html (SPA GitHub Pages).');
