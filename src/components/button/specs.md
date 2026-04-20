# `button` — Specs

## Objectif UX

Fournir un bouton Material Design 3 Expressive polyvalent (actions principales/secondaires, toggle, direction LTR/RTL) avec accessibilité native.

## Rôles et accessibilité

- Contrôle natif `button` par défaut, `a` quand `href` est présent.
- `aria-label` relayé sur le contrôle interne.
- `aria-pressed` géré automatiquement en mode `toggle`.
- `disabled` et `soft-disabled` supportés.

## États

- Hover/focus/pressed via state layer (`::before`).
- Morph de forme au pressed/selected.
- Prise en charge du mode `no-autoinit` via `BaseComponent`.

## API

- Variants: `elevated`, `filled`, `tonal`, `outlined`, `text`.
- Icônes: `icon-leading`, `icon-trailing`.
- Direction: `dir="ltr|rtl"` (ou héritage parent/document).

