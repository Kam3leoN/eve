import { useEffect } from 'react';
import { DocDemo, DocRow } from '../components/DocPrimitives';

const VARIANTS = ['standard', 'filled', 'tonal', 'outlined', 'elevated'] as const;
const SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;
const SHAPES = ['round', 'square'] as const;

export function ButtonIconPage() {
  useEffect(() => {
    document.title = 'Composant Button Icon - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Button Icon</h2>
      <p>
        Composant <code>lib-button-icon</code> selon Material 3 Expressive.
      </p>

      <DocDemo title="Variantes">
        <DocRow>
          {VARIANTS.map((variant) => (
            <lib-button-icon key={variant} variant={variant} icon="menu" aria-label={variant} />
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Tailles">
        <DocRow>
          {SIZES.map((size) => (
            <lib-button-icon key={`default-${size}`} size={size} width="default" variant="filled" icon="check" aria-label={size} />
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Default and toggle (selected / pressed)">
        <DocRow>
          <lib-button-icon variant="standard" icon="menu" aria-label="standard default" />
          <lib-button-icon toggle variant="filled" icon="menu" aria-label="filled unselected" />
          <lib-button-icon toggle pressed variant="filled" icon="menu" aria-label="filled selected" />
          <lib-button-icon toggle variant="tonal" icon="menu" aria-label="filled tonal" />
          <lib-button-icon toggle variant="outlined" icon="menu" aria-label="outlined" />
          <lib-button-icon toggle variant="elevated" icon="menu" aria-label="elevated" />
        </DocRow>
      </DocDemo>

      <DocDemo title="Shapes (round, square) + morph pressed/selected">
        <DocRow>
          {SHAPES.map((shape) => (
            <lib-button-icon
              key={`shape-${shape}`}
              shape={shape}
              toggle
              pressed
              size="medium"
              width="default"
              variant="filled"
              icon="check"
              aria-label={`shape ${shape}`}
            />
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Narrow - toutes les tailles">
        <DocRow>
          {SIZES.map((size) => (
            <lib-button-icon
              key={`narrow-${size}`}
              size={size}
              width="narrow"
              variant="filled"
              icon="menu"
              aria-label={`narrow ${size}`}
            />
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Wide - toutes les tailles">
        <DocRow>
          {SIZES.map((size) => (
            <lib-button-icon
              key={`wide-${size}`}
              size={size}
              width="wide"
              variant="filled"
              icon="menu"
              aria-label={`wide ${size}`}
            />
          ))}
        </DocRow>
      </DocDemo>

    </section>
  );
}
