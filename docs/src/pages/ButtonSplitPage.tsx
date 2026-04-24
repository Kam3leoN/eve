import { useEffect } from 'react';
import { DocDemo, DocRow } from '../components/DocPrimitives';

const VARIANTS = ['elevated', 'filled', 'tonal', 'outlined'] as const;
const SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export function ButtonSplitPage() {
  useEffect(() => {
    document.title = 'Composant Button Split - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Button Split</h2>
      <p>
        Composant <code>lib-button-split</code> pour action principale + action secondaire/menu.
      </p>

      <DocDemo title="Variantes">
        <DocRow>
          {VARIANTS.map((variant) => (
            <lib-button-split
              key={variant}
              variant={variant}
              icon-leading="check"
              aria-label={`Action ${variant}`}
              secondary-aria-label={`Menu ${variant}`}
            >
              Label
            </lib-button-split>
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Tailles XS à XL">
        <DocRow>
          {SIZES.map((size) => (
            <lib-button-split
              key={size}
              size={size}
              variant="filled"
              icon-leading="check"
              aria-label={`Action ${size}`}
              secondary-aria-label={`Menu ${size}`}
            >
              Label
            </lib-button-split>
          ))}
        </DocRow>
      </DocDemo>

      <DocDemo title="Trailing icon-only (50/50)">
        <DocRow>
          <lib-button-split
            size="medium"
            variant="filled"
            icon-leading="check"
            aria-label="Action principale"
            secondary-aria-label="Menu"
            equal-parts
          />
        </DocRow>
      </DocDemo>

      <DocDemo title="Exemple RTL" dir="rtl">
        <DocRow>
          <lib-button-split variant="tonal" icon-leading="menu" aria-label="Action" secondary-aria-label="Menu">
            اعدادات
          </lib-button-split>
        </DocRow>
      </DocDemo>
    </section>
  );
}
