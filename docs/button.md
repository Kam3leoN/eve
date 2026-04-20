# Eve Button

## 1) Hero (Demo)

`button` implémente les variants officiels Material Design 3: `elevated`, `filled`, `tonal`, `outlined`, `text`, avec tailles, formes, toggle, icônes et support RTL.

## 2) Description (UX)

Le composant couvre les actions primaires/secondaires et les interactions à fort feedback visuel (state layers, morph de forme en interaction), tout en conservant une sémantique native `button`/`a`.

## 3) Tableau API

| Props | Type | Défaut | Description |
|---|---|---:|---|
| `variant` | `elevated \| filled \| tonal \| outlined \| text` | `filled` | Style visuel M3 |
| `size` | `extra-small \| small \| medium \| large \| extra-large` | `medium` | Taille du contrôle |
| `shape` | `round \| square` | `round` | Géométrie de base |
| `toggle` | `boolean` | `false` | Active le mode bouton bascule |
| `pressed` | `boolean` | `false` | État courant en mode toggle |
| `icon-leading` | `string` | - | Icône préfixe |
| `icon-trailing` | `string` | - | Icône suffixe |
| `no-autoinit` | `boolean` | `false` | Empêche init auto, nécessite `init()` |

| Events | Détail |
|---|---|
| `eve-change` | `{ pressed: boolean }` |

| Slots | Description |
|---|---|
| `leading` | Contenu avant libellé |
| *(default)* | Libellé principal |
| `trailing` | Contenu après libellé |

## 4) Exemples

```html
<eve-button variant="filled">Confirmer</eve-button>
<eve-button variant="outlined" icon-leading="check">Valider</eve-button>
<eve-button toggle shape-toggle-swap>Toggle forme</eve-button>
<div dir="rtl">
  <eve-button icon-trailing="chevron-right">التالي</eve-button>
</div>
```
