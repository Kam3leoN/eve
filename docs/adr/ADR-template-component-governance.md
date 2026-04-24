# ADR Template: Component Governance

## Status
Proposed | Accepted | Deprecated

## Context
- Quel problème de cohérence/API est adressé ?
- Quels fichiers système/composant sont concernés ?

## Decision
Définir pour le composant `<name>`:
1. contrat typé (`<name>.contract.ts`)
2. tests de contrat (`<name>.contract.test.ts`)
3. tests a11y (`<name>.a11y.test.ts`)
4. tests visuels (`<name>.visual.test.ts`)
5. registre tokens (`src/scss/token-registry/<name>.tokens.json`)
6. garde stabilité (`scripts/check-<name>-stability.mjs`)

## Consequences
- Gains qualité / coûts maintenance.
- Impacts CI/CD et release.

## Versioning policy
- `stable`
- `experimental`
- `deprecated`

## Migration policy
Décrire comment gérer suppression/renommage d’attribut, d’event, de token.
