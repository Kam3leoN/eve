# `Ripple` — Specs

## But

Appliquer un effet d’ondulation Material sur une surface interactive.

## Comportement

- Écoute `pointerdown`.
- Crée un nœud ripple temporaire positionné selon le point d’impact.
- Nettoie les nœuds et écouteurs via `destroy()`.

