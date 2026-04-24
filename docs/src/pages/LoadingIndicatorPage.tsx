import { useEffect, useState } from 'react';
import { DocCodeBlock, DocDemo, DocRow } from '../components/DocPrimitives';

const VARIANT_OPTIONS = ['default', 'contained'] as const;

export function LoadingIndicatorPage() {
  const [variant, setVariant] = useState<(typeof VARIANT_OPTIONS)[number]>('default');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.title = 'Composant Loading Indicator - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Loading Indicator</h2>
      <p>
        <code>lib-loading-indicator</code> implémente un chargement Material 3 Expressive avec morphing de formes via{' '}
        <code>lib-shape</code> et rotation continue.
      </p>

      <DocDemo title="Playground">
        <div className="stack" style={{ gap: '1rem' }}>
          <label htmlFor="loading-variant-input">
            Variante
            <select
              id="loading-variant-input"
              value={variant}
              onChange={(event) => setVariant(event.target.value as (typeof VARIANT_OPTIONS)[number])}
              style={{ marginInlineStart: '0.75rem' }}
            >
              {VARIANT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="loading-paused-input">
            <input
              id="loading-paused-input"
              type="checkbox"
              checked={paused}
              onChange={(event) => setPaused(event.target.checked)}
              style={{ marginInlineEnd: '0.5rem' }}
            />
            Pause animation
          </label>

          <DocRow>
            <lib-loading-indicator variant={variant} paused={paused} aria-label="Chargement en cours" />
          </DocRow>
        </div>
      </DocDemo>

      <DocDemo title="Configurations">
        <DocRow>
          <lib-loading-indicator variant="default" aria-label="Chargement default" />
          <lib-loading-indicator variant="contained" aria-label="Chargement contained" />
        </DocRow>
      </DocDemo>

      <DocDemo title="Exemple RTL" description="La rotation est automatiquement inversée en RTL.">
        <DocRow dir="rtl">
          <lib-loading-indicator variant="default" aria-label="جاري التحميل" />
        </DocRow>
      </DocDemo>

      <DocDemo title="Code">
        <DocCodeBlock>{`<lib-loading-indicator aria-label="Loading"></lib-loading-indicator>
<lib-loading-indicator variant="contained"></lib-loading-indicator>
<lib-loading-indicator duration="2800"></lib-loading-indicator>
<lib-loading-indicator variant="default" paused></lib-loading-indicator>`}</DocCodeBlock>
      </DocDemo>
    </section>
  );
}
