# Audit style components

## Convention cible

- Dossier composant: `style/`
- Fichiers: `_token.scss`, `_mixin.scss`, `_module.scss`
- Entree SCSS composant: `@use "./style/token"; @use "./style/mixin"; @use "./style/module";`
- Prefix dynamique via `@use "../../../scss/custom/config" as *;` et `--#{$prefix}-...`

## Matrice de conformite

| Component | Entry `style/*` | Triade singuliere en place | Prefix dynamique |
| --- | --- | --- | --- |
| button | oui | oui | oui |
| button-icon | oui | oui | oui |
| button-group | oui | oui | oui |
| button-split | oui | oui (token/mixin placeholder) | oui |
| card | oui | oui (mixin placeholder) | oui |
| loading-indicator | oui | oui | oui |
| navigation-card | oui | oui (token/mixin placeholder) | oui |
| shape | oui | oui | oui |
| text-field | oui | oui | oui |

## Template migration composant

1. Creer `style/_token.scss`, `style/_mixin.scss`, `style/_module.scss`.
2. Basculer `<component>.scss` vers `@use "./style/token"; @use "./style/mixin"; @use "./style/module";`.
3. S'assurer que les tokens CSS exposent `--#{$prefix}-...`.
4. Ajouter des placeholders documentes pour `token` ou `mixin` si non necessaires.
5. Verifier build/tests apres migration.
