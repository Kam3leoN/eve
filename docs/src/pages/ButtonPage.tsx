import { useEffect } from 'react';

const VARIANTS = ['elevated', 'filled', 'tonal', 'outlined', 'text'] as const;

const SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export function ButtonPage() {
  useEffect(() => {
    document.title = 'Composant Button - Eve Docs';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Boutons M3 Expressive : variantes, toggle forme, icônes, RTL/LTR, tailles.',
    );
  }, []);

  return (
    <section>
      <h2>Button</h2>
      <p>
        Exemples avec le Web Component <code>eve-button</code> (common buttons Material 3 Expressive).
      </p>

      <div className="docs-demo">
        <h3>Variantes (sans icône)</h3>
        <p>Les cinq types : <code>elevated</code>, <code>filled</code>, <code>tonal</code>,{' '}
        <code>outlined</code>, <code>text</code>.</p>
        <div className="docs-button-row" aria-label="Variantes sans icône">
          {VARIANTS.map((v) => (
            <eve-button key={v} variant={v}>
              {v}
            </eve-button>
          ))}
        </div>
      </div>

      <div className="docs-demo">
        <h3>Icônes</h3>
        <p>
          Attributs <code>icon-leading</code> et <code>icon-trailing</code> (sprite intégré :{' '}
          <code>check</code>, <code>close</code>, <code>menu</code>, <code>chevron-right</code>).
        </p>

        <p className="docs-subsection-title">Icône leading</p>
        <div className="docs-button-row">
          <eve-button variant="filled" icon-leading="check">
            Confirmer
          </eve-button>
        </div>

        <p className="docs-subsection-title">Icône trailing</p>
        <div className="docs-button-row">
          <eve-button variant="filled" icon-trailing="chevron-right">
            Suivant
          </eve-button>
        </div>

        <p className="docs-subsection-title">Leading et trailing</p>
        <div className="docs-button-row">
          <eve-button variant="filled" icon-leading="check" icon-trailing="chevron-right">
            Valider
          </eve-button>
        </div>
      </div>

      <div className="docs-demo">
        <h3>Direction LTR / RTL</h3>
        <p>
          <code>dir</code> sur le bouton ou hérité du conteneur ; le chevron directionnel se miroite
          en RTL.
        </p>

        <div className="docs-dir-panel" dir="ltr">
          <p className="docs-subsection-title">LTR</p>
          <div className="docs-button-row">
            <eve-button variant="tonal" icon-leading="menu">
              Menu
            </eve-button>
            <eve-button variant="tonal" icon-trailing="chevron-right">
              Suite
            </eve-button>
            <eve-button variant="tonal" icon-leading="check" icon-trailing="chevron-right">
              OK
            </eve-button>
          </div>
        </div>

        <div className="docs-dir-panel" dir="rtl">
          <p className="docs-subsection-title">RTL</p>
          <div className="docs-button-row">
            <eve-button variant="tonal" icon-leading="menu">
              Menu
            </eve-button>
            <eve-button variant="tonal" icon-trailing="chevron-right">
              Suite
            </eve-button>
            <eve-button variant="tonal" icon-leading="check" icon-trailing="chevron-right">
              OK
            </eve-button>
          </div>
        </div>
      </div>

      <div className="docs-demo">
        <h3>Tailles et formes</h3>
        <p>
          Cinq tailles (<code>extra-small</code> … <code>extra-large</code>) × deux formes :{' '}
          <code>round</code> (pilule, défaut) et <code>square</code> (row B Expressive).
        </p>
        <div className="docs-table-wrap">
          <table className="docs-size-table">
            <thead>
              <tr>
                <th scope="col">Taille</th>
                <th scope="col">Pilule (round)</th>
                <th scope="col">Carré (square)</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size}>
                  <td>{size}</td>
                  <td>
                    <eve-button variant="filled" size={size} shape="round">
                      Label
                    </eve-button>
                  </td>
                  <td>
                    <eve-button variant="filled" size={size} shape="square">
                      Label
                    </eve-button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="docs-demo">
        <h3>Toggle forme : carré → pilule</h3>
        <p>
          <code>toggle</code> + <code>shape-toggle-swap</code> + <code>shape=&quot;square&quot;</code> : au
          repos la géométrie est <strong>carrée</strong> ; une fois sélectionné (<code>pressed</code>), la
          forme passe en <strong>pilule</strong> (M3 Expressive row C).
        </p>
        <p className="docs-subsection-title">Cliquer pour basculer la forme</p>
        <div className="docs-button-row" aria-label="Toggle carré vers pilule par variante">
          {VARIANTS.map((v) => (
            <eve-button
              key={`sq-${v}`}
              variant={v}
              shape="square"
              toggle
              {...{ 'shape-toggle-swap': true }}
            >
              {v}
            </eve-button>
          ))}
        </div>
      </div>

      <div className="docs-demo">
        <h3>Toggle forme : pilule → carré</h3>
        <p>
          Même principe avec <code>shape=&quot;round&quot;</code> : au repos <strong>pilule</strong> ; une fois
          sélectionné, la forme passe en <strong>carré</strong> (row B).
        </p>
        <p className="docs-subsection-title">Cliquer pour basculer la forme</p>
        <div className="docs-button-row" aria-label="Toggle pilule vers carré par variante">
          {VARIANTS.map((v) => (
            <eve-button
              key={`rd-${v}`}
              variant={v}
              shape="round"
              toggle
              {...{ 'shape-toggle-swap': true }}
            >
              {v}
            </eve-button>
          ))}
        </div>
      </div>

      <div className="docs-demo">
        <h3>Code</h3>
        <pre>
          <code>
            {`<!-- Variantes -->
<eve-button variant="elevated">elevated</eve-button>
<eve-button variant="filled">filled</eve-button>
<eve-button variant="tonal">tonal</eve-button>
<eve-button variant="outlined">outlined</eve-button>
<eve-button variant="text">text</eve-button>

<!-- Icônes -->
<eve-button variant="filled" icon-leading="check">…</eve-button>
<eve-button variant="filled" icon-trailing="chevron-right">…</eve-button>
<eve-button variant="filled" icon-leading="check" icon-trailing="chevron-right">…</eve-button>

<!-- RTL (hérité ou explicite) -->
<div dir="rtl">
  <eve-button variant="tonal" icon-trailing="chevron-right">Suite</eve-button>
</div>
<eve-button variant="tonal" dir="rtl" icon-trailing="chevron-right">Suite</eve-button>

<!-- Taille + forme -->
<eve-button variant="filled" size="medium" shape="round">…</eve-button>
<eve-button variant="filled" size="medium" shape="square">…</eve-button>

<!-- Toggle : carré → pilule (sélectionné = pilule) -->
<eve-button variant="filled" shape="square" toggle shape-toggle-swap>…</eve-button>

<!-- Toggle : pilule → carré (sélectionné = carré) -->
<eve-button variant="filled" shape="round" toggle shape-toggle-swap>…</eve-button>`}
          </code>
        </pre>
      </div>
    </section>
  );
}
