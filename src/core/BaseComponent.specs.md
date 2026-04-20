# `BaseComponent` — Specs

## Responsabilités

- Gérer un cycle de vie unifié (`init`, `destroy`).
- Respecter `no-autoinit` pour différer l’initialisation.
- Garantir une initialisation idempotente.

## Contrat

- `connectedCallback` appelle `init()` sauf si `no-autoinit`.
- `disconnectedCallback` appelle `destroy()`.
- Les composants concrets implémentent `onInit()` et `onDestroy()`.

