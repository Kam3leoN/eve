# `text-field` — Specs

## Objectif UX

Fournir un champ de saisie Material 3 Expressive (variants `filled` et `outlined`) pour les formulaires courts/longs avec états explicites, validation native et feedback clair.

## Accessibilité

- Label explicite via `label` (ou fallback `aria-label`).
- Lien sémantique message d’aide/erreur via `aria-describedby`.
- Support des états `required`, `disabled`, `readonly`, `aria-invalid`.
- Support directionnel `dir="ltr|rtl"` (explicite ou hérité).

## États

- `hover`, `focus`, `error`, `disabled`, `readonly`, `with-value`.
- Compteur automatique avec `maxlength`.
- Priorité d’affichage: `error-text` > message de validation natif > `supporting-text`.

## API

- `variant`: `filled | outlined`
- `label`, `placeholder`, `value`
- `supporting-text`, `error-text`, `error`
- `prefix-text`, `suffix-text`
- `text-align`: `left | right` (alignement explicite de la valeur dans l’input, utile pour montants/unités)
- `icon-leading`, `icon-trailing` (ou slots) — clés : `check`, `close`, `menu`, `chevron-right`, `visibility`, `visibility-off`, `refresh`
- Mot de passe (`type="password"`) : `password-toggle` (icône afficher/masquer), `password-generate` (générer), contraintes optionnelles `password-min-length`, `password-min-lower`, `password-min-upper`, `password-min-digit`, `password-min-special` (validation native + `setCustomValidity`). Helpers exportés : `src/core/password` (`validatePasswordValue`, `generatePassword`, `readPasswordPolicyFromElement`, etc.).
- Méthodes exposées: `focus`, `blur`, `select`, `setSelectionRange`, `checkValidity`, `reportValidity`, `setCustomValidity`
