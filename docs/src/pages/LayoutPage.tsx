import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const LAYOUT_TOKENS = [
  'max-width',
  'columns',
  'padding-x',
  'gap',
  'row-gap',
  'col-gap',
  'content-max',
  'gap-0',
  'gap-1',
  'gap-2',
  'gap-3',
  'gap-4',
  'gap-5',
] as const;

const SPANS = [1, 2, 3, 4, 6, 12] as const;
const OFFSETS = [1, 2, 3, 4, 6] as const;
const GAPS = [0, 1, 2, 3, 4, 5] as const;

export function LayoutPage() {
  useEffect(() => {
    document.title = 'Layout - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Layout</h2>
      <p>
        Systeme grille/espacements expose en <code>--liblayout-*</code> avec utilitaires
        <code> .container</code>, <code>.row</code>, <code>.col</code>, <code>.s1..s12</code>,
        <code> .m1..</code>, <code>.l1..</code>, <code>.xl1..</code>.
      </p>

      <DocDemo title="Tokens layout">
        <div style={{ overflowX: 'auto' }}>
          <table className="eve-docs-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Variable</th>
              </tr>
            </thead>
            <tbody>
              {LAYOUT_TOKENS.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <code>{`--liblayout-${name}`}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocDemo>

      <DocDemo title="Exemple grille">
        <div className="container">
          <div className="row g-2">
            <div className="s12 m6 l4">
              <div className="docs-layout-box">s12 m6 l4</div>
            </div>
            <div className="s12 m6 l4">
              <div className="docs-layout-box">s12 m6 l4</div>
            </div>
            <div className="s12 l4">
              <div className="docs-layout-box">s12 l4</div>
            </div>
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Spans small (s1..s12)">
        <div className="container">
          <div className="row g-1">
            {SPANS.map((span) => (
              <div key={`s-${span}`} className={`s${span}`}>
                <div className="docs-layout-box">{`s${span}`}</div>
              </div>
            ))}
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Spans medium (m1..m12)">
        <div className="container">
          <div className="row g-1">
            {SPANS.map((span) => (
              <div key={`m-${span}`} className={`s12 m${span}`}>
                <div className="docs-layout-box">{`s12 m${span}`}</div>
              </div>
            ))}
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Spans large (l1..l12)">
        <div className="container">
          <div className="row g-1">
            {SPANS.map((span) => (
              <div key={`l-${span}`} className={`s12 l${span}`}>
                <div className="docs-layout-box">{`s12 l${span}`}</div>
              </div>
            ))}
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Spans extra-large (xl1..xl12)">
        <div className="container">
          <div className="row g-1">
            {SPANS.map((span) => (
              <div key={`xl-${span}`} className={`s12 xl${span}`}>
                <div className="docs-layout-box">{`s12 xl${span}`}</div>
              </div>
            ))}
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Offsets (offset-s / m / l / xl)">
        <div className="container docs-layout-stack">
          {OFFSETS.map((offset) => (
            <div key={`os-${offset}`} className="row g-1">
              <div className={`s4 offset-s${offset}`}>
                <div className="docs-layout-box">{`s4 offset-s${offset}`}</div>
              </div>
            </div>
          ))}
          {OFFSETS.map((offset) => (
            <div key={`om-${offset}`} className="row g-1">
              <div className={`s12 m4 offset-m${offset}`}>
                <div className="docs-layout-box">{`s12 m4 offset-m${offset}`}</div>
              </div>
            </div>
          ))}
          {OFFSETS.map((offset) => (
            <div key={`ol-${offset}`} className="row g-1">
              <div className={`s12 l4 offset-l${offset}`}>
                <div className="docs-layout-box">{`s12 l4 offset-l${offset}`}</div>
              </div>
            </div>
          ))}
          {OFFSETS.map((offset) => (
            <div key={`oxl-${offset}`} className="row g-1">
              <div className={`s12 xl4 offset-xl${offset}`}>
                <div className="docs-layout-box">{`s12 xl4 offset-xl${offset}`}</div>
              </div>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Span full">
        <div className="container">
          <div className="row g-1">
            <div className="s4">
              <div className="docs-layout-box">s4</div>
            </div>
            <div className="s4">
              <div className="docs-layout-box">s4</div>
            </div>
            <div className="span-full">
              <div className="docs-layout-box">span-full</div>
            </div>
            <div className="s6">
              <div className="docs-layout-box">s6</div>
            </div>
            <div className="s6">
              <div className="docs-layout-box">s6</div>
            </div>
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Gaps (g-0..g-5)">
        <div className="container docs-layout-stack">
          {GAPS.map((gap) => (
            <div key={`g-${gap}`} className={`row g-${gap}`}>
              <div className="s4">
                <div className="docs-layout-box">{`g-${gap}`}</div>
              </div>
              <div className="s4">
                <div className="docs-layout-box">{`g-${gap}`}</div>
              </div>
              <div className="s4">
                <div className="docs-layout-box">{`g-${gap}`}</div>
              </div>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Helpers cluster / stack / content">
        <div className="container">
          <div className="content">
            <div className="cluster">
              <div className="docs-layout-box">cluster-1</div>
              <div className="docs-layout-box">cluster-2</div>
              <div className="docs-layout-box">cluster-3</div>
            </div>
            <div className="stack" style={{ marginTop: '0.75rem' }}>
              <div className="docs-layout-box">stack-1</div>
              <div className="docs-layout-box">stack-2</div>
              <div className="docs-layout-box">stack-3</div>
            </div>
          </div>
        </div>
      </DocDemo>
    </section>
  );
}
