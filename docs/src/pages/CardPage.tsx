import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const VARIANTS = ['elevated', 'filled', 'outlined'] as const;
const LAYOUTS = ['vertical-list', 'mosaic', 'staggered'] as const;

export function CardPage() {
  useEffect(() => {
    document.title = 'Composant Card - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Card</h2>
      <p>
        <code>lib-card</code> suit Material 3 Expressive : 3 variantes, contenu libre, layout adaptatif, et comportements
        interactifs.
      </p>

      <DocDemo
        title="Variantes"
        description="Coins 12dp, padding horizontal 16dp, espacement inter-cartes max 8dp, texte start-aligné."
      >
        <div className="row g-2 docs-card-variants-row">
          {VARIANTS.map((variant) => (
            <div key={variant} className="s12 m6 l4">
              <lib-card variant={variant} className="docs-card-variant-sample">
                <lib-button-icon slot="menu" variant="standard" icon="menu" aria-label={`Menu ${variant}`} />
                <h4 slot="headline">{variant[0].toUpperCase() + variant.slice(1)}</h4>
              </lib-card>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Variante avec image dans le contenu">
        <div className="row g-2">
          <div className="s12 m8 l6">
            <lib-card variant="filled" media-first media-bleed className="docs-card-media-sample">
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=60"
                alt="Scène de concert avec confettis"
                loading="lazy"
              />
              <h4 slot="headline">Glass Souls&apos; World Tour</h4>
              <p slot="subhead">From your recent favorites</p>
              <div slot="actions">
                <lib-button variant="filled">Buy tickets</lib-button>
              </div>
            </lib-card>
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Contenu riche et composants imbriqués">
        <div className="row g-2">
          <div className="s12 l6">
            <lib-card variant="filled" layout="mosaic">
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=60"
                alt="Foule et ballons en concert"
                loading="lazy"
              />
              <h4 slot="headline">Glass Souls’ World Tour</h4>
              <p slot="subhead">From your recent favorites</p>
              <p slot="supporting">Les cartes peuvent contenir image, titre, texte de support, listes et actions.</p>
              <ul slot="list">
                <li>Headline + Subhead</li>
                <li>Supporting text</li>
                <li>Actions et menu</li>
              </ul>
              <lib-button-icon slot="menu" variant="standard" icon="menu" aria-label="Ouvrir le menu" />
              <div slot="actions">
                <lib-button variant="filled">Buy tickets</lib-button>
              </div>
            </lib-card>
          </div>
          <div className="s12 l6">
            <lib-card variant="outlined" orientation="horizontal" interactive href="/styles/theme">
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1464047736614-af63643285bf?auto=format&fit=crop&w=900&q=60"
                alt="Photo abstraite colorée"
                loading="lazy"
              />
              <h4 slot="headline">Navigation card</h4>
              <p slot="subhead">Interaction + navigation</p>
              <p slot="supporting">
                Une carte peut encapsuler d’autres composants EVE (buttons, icon buttons, listes...).
              </p>
              <div slot="actions">
                <lib-button variant="tonal">Voir détails</lib-button>
                <lib-button variant="text">Partager</lib-button>
              </div>
            </lib-card>
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Layouts flexibles">
        <div className="docs-card-layout-grid">
          {LAYOUTS.map((layout) => (
            <lib-card key={layout} variant="filled" layout={layout}>
              <h4 slot="headline">{layout}</h4>
              <p slot="subhead">Layout tokenisé</p>
              <p slot="supporting">Dimensions pilotées par le contenu et le contexte parent.</p>
              <div slot="actions">
                <lib-button variant="text">Action</lib-button>
              </div>
            </lib-card>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Expanding / ergonomie / comportement">
        <div className="row g-2">
          <div className="s12 m6">
            <lib-card variant="outlined" expandable expanded>
              <h4 slot="headline">Carte extensible</h4>
              <p slot="subhead">Expanding</p>
              <p slot="supporting">Cliquer sur la surface bascule l’état expanded.</p>
              <p>Contenu additionnel affiché uniquement en état étendu.</p>
              <div slot="actions">
                <lib-button variant="text">Réduire</lib-button>
              </div>
            </lib-card>
          </div>
          <div className="s12 m6">
            <lib-card variant="filled" pickup-move interactive>
              <h4 slot="headline">Pick up &amp; move</h4>
              <p slot="subhead">Drag and drop ready</p>
              <p slot="supporting">Activer <code>pickup-move</code> pour autoriser le drag de la carte.</p>
              <div slot="actions">
                <lib-button variant="tonal">Déplacer</lib-button>
              </div>
            </lib-card>
          </div>
        </div>
      </DocDemo>

      <DocDemo
        title="Filtering / sorting"
        description={
          <>
            Utiliser les helpers statiques <code>Card.filter(...)</code> et <code>Card.sort(...)</code> pour filtrer / trier
            les collections de <code>lib-card</code> côté application.
          </>
        }
      />

      <DocDemo title="Exemple RTL" dir="rtl">
        <lib-card variant="filled">
          <h4 slot="headline">بطاقة مرنة</h4>
          <p slot="subhead">وضع RTL</p>
          <p slot="supporting">محاذاة النص تبدأ من الاتجاه المنطقي مع دعم المحتوى المركب.</p>
          <div slot="actions">
            <lib-button variant="filled">إجراء</lib-button>
          </div>
        </lib-card>
      </DocDemo>
    </section>
  );
}
