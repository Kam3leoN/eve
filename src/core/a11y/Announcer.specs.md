# `Announcer` — Specs

## But

Fournir un utilitaire simple pour annoncer des messages aux lecteurs d’écran via une région `aria-live` unique.

## Comportement

- `announce(message, politeness)` publie un texte (`polite` ou `assertive`).
- Région live créée à la demande, puis réutilisée.
- `destroy()` retire la région live.

