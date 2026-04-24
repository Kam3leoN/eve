import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const BASE_COLORS = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey',
] as const;

const TONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100] as const;
const MD3_PALETTES = ['primary', 'secondary', 'tertiary', 'error'] as const;

export function PalettePage() {
  useEffect(() => {
    document.title = 'Palette - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Palette</h2>
      <p>
        Base couleurs de reference + tonalites MD3 (10..100), en rendu flat.
      </p>

      <DocDemo title="Base couleurs">
        <div className="docs-palette-stack">
          {BASE_COLORS.map((name) => (
            <div key={name} className="docs-palette-ramp">
              <div className="docs-palette-ramp-label">{name}</div>
              <div className="docs-palette-ramp-scale docs-palette-ramp-scale--interactive">
                {TONES.map((tone) => (
                  <div key={`${name}-${tone}`} className={`base-tone-${name}-${tone}`}>
                    {tone}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Tonalites MD3 (10..100)">
        <div className="docs-palette-stack">
          {MD3_PALETTES.map((palette) => (
            <div key={palette} className="docs-palette-ramp">
              <div className="docs-palette-ramp-label">{palette}</div>
              <div className="docs-palette-ramp-scale">
                {TONES.map((tone) => (
                  <div key={`${palette}-${tone}`} className={`md3-tone-${palette}-${tone}`}>
                    {tone}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocDemo>
    </section>
  );
}
