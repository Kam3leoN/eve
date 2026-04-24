# ADR: Button Contract and Governance

## Status
Accepted

## Context
Le composant `button` est riche (variantes, tailles, toggle, modes `button`/`a`, RTL/LTR, a11y).  
Le risque principal est la divergence entre:
- implémentation (`button.ts`)
- docs (`ButtonPage.tsx`)
- tests
- stabilité API.

## Decision
Nous adoptons un modèle gouverné pour `button`:
1. **Contrat typé** (`button.contract.ts`) comme source machine-readable.
2. **Tests de contrat** pour valider l’alignement avec `observedAttributes`.
3. **Garde stabilité** (`check-button-stability`) pour empêcher suppression silencieuse d’attribut.
4. **Registre tokens** + check de cohérence SCSS.
5. **Manifest custom elements** généré dans `dist/custom-elements.json`.
6. **Suites dédiées** a11y et visuel.

## Consequences
- Plus de fichiers, mais meilleure fiabilité API.
- Les évolutions breaking doivent être explicites (migration file).
- Ce pattern devient le template de référence pour les autres composants.

## Versioning policy
- `stable`: peut évoluer sans rupture.
- `experimental`: peut changer avec notice.
- `deprecated`: maintien temporaire, migration documentée obligatoire.

## Migration policy
Toute suppression d’attribut doit:
1. être ajoutée dans `button.migrations.json`,
2. être documentée dans les notes de version,
3. inclure une recommandation de remplacement.
