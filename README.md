# Eve

Librairie UI **Material 3 Expressive** en **Vanilla TypeScript** (Web Components), légère et agnostique du framework.

## Développement

```bash
npm ci
npm run build
```

Sortie : `dist/` (`eve.min.js`, `eve.min.css`, etc.).

## Documentation (site statique)

La documentation est l’application **Vite + React** dans `docs/` (compatible **GitHub Pages**, même principe que les dépôts type « dynaperf » : `base` dynamique, `404.html` = `index.html` pour le routage SPA).

À la racine du dépôt :

Après chaque `npm run build`, les bundles sont **recopiés** dans `docs/public/eve/` (`postbuild`), pour que la doc ne serve pas une ancienne version de la lib.

```bash
# Build lib + lancer la doc en dev (http://localhost:5173 avec base /)
npm run dev
# équivalent : npm run docs:dev
```

```bash
# Build lib + build doc → docs/dist
npm run docs:build

# Servir le build localement
npm run docs:preview
```

Sur **GitHub Actions**, le workflow `.github/workflows/pages.yml` enchaîne : build de la lib → copie des bundles dans `docs/public/eve/` → build de la doc → déploiement de `docs/dist` sur **GitHub Pages**.

L’URL publique est du type `https://<user>.github.io/<nom-du-repo>/` (le préfixe est dérivé de `GITHUB_REPOSITORY` au build).

Si un ancien dossier `docs-app/` est encore présent à la racine (reste d’une migration), supprimez-le manuellement après avoir fermé les outils qui verrouillent ses fichiers (IDE, antivirus).

## Ancien dossier `eve-docs/` (hors dépôt)

Si vous aviez une copie locale séparée `eve-docs/`, préférez désormais le dossier **`docs/`** dans ce dépôt comme seule source de vérité pour la doc.
