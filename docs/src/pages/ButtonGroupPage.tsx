import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export function ButtonGroupPage() {
  useEffect(() => {
    document.title = 'Composant Button Group - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Button Group</h2>
      <p>
        <code>lib-button-group</code> propose deux modes : standard et connected.
      </p>

      <DocDemo title="Standard" description={<>Exemple en mode <code>toggle</code>.</>}>
        <lib-button-group variant="standard">
          <lib-button-icon variant="tonal" icon="check" aria-label="Valider" toggle />
          <lib-button-icon variant="tonal" width="narrow" icon="menu" aria-label="Menu narrow" toggle />
          <lib-button variant="tonal" icon-leading="menu" toggle>
            Label
          </lib-button>
          <lib-button-icon variant="tonal" width="wide" icon="menu" aria-label="Menu wide" toggle />
          <lib-button-icon variant="tonal" icon="menu" aria-label="Menu" toggle />
        </lib-button-group>
      </DocDemo>

      <DocDemo title="Connected">
        <div className="stack">
          <lib-button-group variant="connected">
            <lib-button-icon size="small" variant="tonal" icon="check" aria-label="Icon 1" />
            <lib-button-icon size="small" variant="tonal" icon="menu" aria-label="Icon selected" />
            <lib-button-icon size="small" variant="tonal" icon="close" aria-label="Icon 3" />
            <lib-button-icon size="small" variant="tonal" icon="menu" aria-label="Icon 4" />
          </lib-button-group>
          <lib-button-group variant="connected">
            <lib-button size="small" variant="tonal" icon-leading="check">
              Label
            </lib-button>
            <lib-button size="small" variant="tonal" icon-leading="menu">
              Label
            </lib-button>
            <lib-button size="small" variant="tonal" icon-leading="menu">
              Label
            </lib-button>
            <lib-button size="small" variant="tonal" icon-leading="menu">
              Label
            </lib-button>
          </lib-button-group>
        </div>
      </DocDemo>

      <DocDemo
        title="Connected - sélection unique (one-select)"
        description={<>Avec <code>selection-mode="one-select"</code>, un seul bouton peut rester sélectionné.</>}
      >
        <lib-button-group variant="connected" size="small" selection-mode="one-select">
          <lib-button size="small" variant="tonal" icon-leading="check" pressed>
            Option A
          </lib-button>
          <lib-button size="small" variant="tonal" icon-leading="menu">
            Option B
          </lib-button>
          <lib-button size="small" variant="tonal" icon-leading="close">
            Option C
          </lib-button>
        </lib-button-group>
      </DocDemo>

      <DocDemo
        title="Connected - sélection multiple (multi-select)"
        description={<>Avec <code>selection-mode="multi-select"</code>, plusieurs boutons peuvent rester sélectionnés.</>}
      >
        <lib-button-group variant="connected" size="small" selection-mode="multi-select">
          <lib-button size="small" variant="tonal" icon-leading="check" pressed>
            Option A
          </lib-button>
          <lib-button size="small" variant="tonal" icon-leading="menu" pressed>
            Option B
          </lib-button>
          <lib-button size="small" variant="tonal" icon-leading="close">
            Option C
          </lib-button>
        </lib-button-group>
      </DocDemo>

      <DocDemo title="Connected - toutes les tailles">
        <div className="stack">
          {SIZES.map((size) => (
            <lib-button-group key={`connected-${size}`} variant="connected" size={size} selection-mode="one-select">
              <lib-button size={size} variant="tonal" icon-leading="check">
                Label
              </lib-button>
              <lib-button size={size} variant="tonal" icon-leading="menu">
                Label
              </lib-button>
              <lib-button size={size} variant="tonal" icon-leading="menu">
                Label
              </lib-button>
            </lib-button-group>
          ))}
        </div>
      </DocDemo>
    </section>
  );
}
