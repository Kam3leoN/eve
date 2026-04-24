import { useEffect } from 'react';
import { DocCodeBlock, DocDemo, DocRow, DocSubsectionTitle } from '../components/DocPrimitives';

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
        Exemples avec le Web Component <code>lib-button</code> (common buttons Material 3 Expressive).
      </p>

      <DocDemo
        title="Variantes (sans icône)"
        description={
          <>
            Les cinq types : <code>elevated</code>, <code>filled</code>, <code>tonal</code>, <code>outlined</code>,{' '}
            <code>text</code>.
          </>
        }
      >
        <DocRow ariaLabel="Variantes sans icône">
          {VARIANTS.map((v) => (
            <lib-button key={v} variant={v}>
              {v}
            </lib-button>
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo
        title="Icônes"
        description={
          <>
            Attributs <code>icon-leading</code> et <code>icon-trailing</code> (sprite intégré : <code>check</code>,{' '}
            <code>close</code>, <code>menu</code>, <code>chevron-right</code>).
          </>
        }
      >

        <DocSubsectionTitle>Icône leading</DocSubsectionTitle>
        <DocRow>
          <lib-button variant="filled" icon-leading="check">
            Confirmer
          </lib-button>
        </DocRow>

        <DocSubsectionTitle>Icône trailing</DocSubsectionTitle>
        <DocRow>
          <lib-button variant="filled" icon-trailing="chevron-right">
            Suivant
          </lib-button>
        </DocRow>

        <DocSubsectionTitle>Leading et trailing</DocSubsectionTitle>
        <DocRow>
          <lib-button variant="filled" icon-leading="check" icon-trailing="chevron-right">
            Valider
          </lib-button>
        </DocRow>
      </DocDemo>

      <DocDemo
        title="Direction LTR / RTL"
        description={
          <>
            <code>dir</code> sur le bouton ou hérité du conteneur ; le chevron directionnel se miroite en RTL.
          </>
        }
      >

        <DocDemo title="LTR" dir="ltr" style={{ marginTop: 0 }}>
          <DocRow>
            <lib-button variant="tonal" icon-leading="menu">
              Menu
            </lib-button>
            <lib-button variant="tonal" icon-trailing="chevron-right">
              Suite
            </lib-button>
            <lib-button variant="tonal" icon-leading="check" icon-trailing="chevron-right">
              OK
            </lib-button>
          </DocRow>
        </DocDemo>

        <DocDemo title="RTL" dir="rtl" style={{ marginTop: 0 }}>
          <DocRow>
            <lib-button variant="tonal" icon-leading="menu">
              Menu
            </lib-button>
            <lib-button variant="tonal" icon-trailing="chevron-right">
              Suite
            </lib-button>
            <lib-button variant="tonal" icon-leading="check" icon-trailing="chevron-right">
              OK
            </lib-button>
          </DocRow>
        </DocDemo>
      </DocDemo>

      <DocDemo
        title="Tailles et formes"
        description={
          <>
            Cinq tailles (<code>extra-small</code> … <code>extra-large</code>) × deux formes : <code>round</code>{' '}
            (pilule, défaut) et <code>square</code> (row B Expressive).
          </>
        }
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="eve-docs-table">
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
                    <lib-button variant="filled" size={size} shape="round">
                      Label
                    </lib-button>
                  </td>
                  <td>
                    <lib-button variant="filled" size={size} shape="square">
                      Label
                    </lib-button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocDemo>

      <DocDemo
        title="Toggle forme : carré → pilule"
        description={
          <>
            <code>toggle</code> + <code>shape-toggle-swap</code> + <code>shape=&quot;square&quot;</code> : au repos la
            géométrie est <strong>carrée</strong> ; une fois sélectionné (<code>pressed</code>), la forme passe en{' '}
            <strong>pilule</strong> (M3 Expressive row C).
          </>
        }
      >
        <DocSubsectionTitle>Cliquer pour basculer la forme</DocSubsectionTitle>
        <DocRow ariaLabel="Toggle carré vers pilule par variante">
          {VARIANTS.map((v) => (
            <lib-button
              key={`sq-${v}`}
              variant={v}
              shape="square"
              toggle
              {...{ 'shape-toggle-swap': true }}
            >
              {v}
            </lib-button>
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo
        title="Toggle forme : pilule → carré"
        description={
          <>
            Même principe avec <code>shape=&quot;round&quot;</code> : au repos <strong>pilule</strong> ; une fois
            sélectionné, la forme passe en <strong>carré</strong> (row B).
          </>
        }
      >
        <DocSubsectionTitle>Cliquer pour basculer la forme</DocSubsectionTitle>
        <DocRow ariaLabel="Toggle pilule vers carré par variante">
          {VARIANTS.map((v) => (
            <lib-button
              key={`rd-${v}`}
              variant={v}
              shape="round"
              toggle
              {...{ 'shape-toggle-swap': true }}
            >
              {v}
            </lib-button>
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Code">
        <DocCodeBlock>{`<!-- Variantes -->
<lib-button variant="elevated">elevated</lib-button>
<lib-button variant="filled">filled</lib-button>
<lib-button variant="tonal">tonal</lib-button>
<lib-button variant="outlined">outlined</lib-button>
<lib-button variant="text">text</lib-button>

<!-- Icônes -->
<lib-button variant="filled" icon-leading="check">…</lib-button>
<lib-button variant="filled" icon-trailing="chevron-right">…</lib-button>
<lib-button variant="filled" icon-leading="check" icon-trailing="chevron-right">…</lib-button>

<!-- RTL (hérité ou explicite) -->
<div dir="rtl">
  <lib-button variant="tonal" icon-trailing="chevron-right">Suite</lib-button>
</div>
<lib-button variant="tonal" dir="rtl" icon-trailing="chevron-right">Suite</lib-button>

<!-- Taille + forme -->
<lib-button variant="filled" size="medium" shape="round">…</lib-button>
<lib-button variant="filled" size="medium" shape="square">…</lib-button>

<!-- Toggle : carré → pilule (sélectionné = pilule) -->
<lib-button variant="filled" shape="square" toggle shape-toggle-swap>…</lib-button>

<!-- Toggle : pilule → carré (sélectionné = carré) -->
<lib-button variant="filled" shape="round" toggle shape-toggle-swap>…</lib-button>`}</DocCodeBlock>
      </DocDemo>
    </section>
  );
}
