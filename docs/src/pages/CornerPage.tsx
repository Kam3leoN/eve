import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const CORNER_TOKENS = [
  'none',
  'extra-small',
  'small',
  'medium',
  'large',
  'extra-large',
  'full',
] as const;

export function CornerPage() {
  useEffect(() => {
    document.title = 'Corner - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Corner</h2>
      <p>
        Tokens de rayon Material 3 exposes en <code>--md-sys-corner-*</code> et aliases
        <code> --lib-corner-*</code>.
      </p>

      <DocDemo title="Scale corners">
        <div className="docs-corner-grid">
          {CORNER_TOKENS.map((name) => (
            <article key={name} className="docs-corner-card">
              <div
                className="docs-corner-preview"
                style={{ borderRadius: `var(--lib-corner-${name})` }}
                aria-hidden="true"
              />
              <div className="docs-corner-meta">
                <strong>{name}</strong>
                <code>{`--lib-corner-${name}`}</code>
                <code>{`--md-sys-corner-${name}`}</code>
              </div>
            </article>
          ))}
        </div>
      </DocDemo>
    </section>
  );
}
