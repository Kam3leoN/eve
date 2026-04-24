import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

type ColorRole = {
  role: string;
  onRole?: string;
};

function textColorForRole(role: string): string {
  const directPairs: Record<string, string> = {
    primary: 'on-primary',
    secondary: 'on-secondary',
    tertiary: 'on-tertiary',
    error: 'on-error',
    'primary-container': 'on-primary-container',
    'secondary-container': 'on-secondary-container',
    'tertiary-container': 'on-tertiary-container',
    'error-container': 'on-error-container',
    'inverse-surface': 'inverse-on-surface',
    'inverse-on-surface': 'inverse-surface',
  };

  if (directPairs[role]) {
    return `var(--lib-color-${directPairs[role]})`;
  }

  if (role.startsWith('on-')) {
    return `var(--lib-color-${role.replace(/^on-/, '')})`;
  }

  if (
    role === 'surface' ||
    role === 'surface-dim' ||
    role === 'surface-bright' ||
    role === 'surface-container-lowest' ||
    role === 'surface-container-low' ||
    role === 'surface-container' ||
    role === 'surface-container-high' ||
    role === 'surface-container-highest' ||
    role === 'background' ||
    role === 'surface-variant' ||
    role === 'outline' ||
    role === 'outline-variant' ||
    role === 'inverse-primary'
  ) {
    return 'var(--lib-color-on-surface)';
  }

  if (role === 'scrim' || role === 'shadow') {
    return 'var(--lib-color-surface)';
  }

  return 'var(--lib-color-on-surface)';
}

const CORE_GROUPS: Array<Array<ColorRole>> = [
  [
    { role: 'primary', onRole: 'on-primary' },
    { role: 'primary-container', onRole: 'on-primary-container' },
  ],
  [
    { role: 'secondary', onRole: 'on-secondary' },
    { role: 'secondary-container', onRole: 'on-secondary-container' },
  ],
  [
    { role: 'tertiary', onRole: 'on-tertiary' },
    { role: 'tertiary-container', onRole: 'on-tertiary-container' },
  ],
  [
    { role: 'error', onRole: 'on-error' },
    { role: 'error-container', onRole: 'on-error-container' },
  ],
];

const SURFACE_TOP: Array<ColorRole> = [
  { role: 'surface-dim' },
  { role: 'surface' },
  { role: 'surface-bright' },
];

const SURFACE_CONTAINERS: Array<ColorRole> = [
  { role: 'surface-container-lowest' },
  { role: 'surface-container-low' },
  { role: 'surface-container' },
  { role: 'surface-container-high' },
  { role: 'surface-container-highest' },
];

const BOTTOM_ROLES: Array<ColorRole> = [
  { role: 'on-surface' },
  { role: 'on-surface-variant' },
  { role: 'outline' },
  { role: 'outline-variant' },
];

function Swatch({ role, onRole }: ColorRole) {
  return (
    <>
      <div
        className="docs-theme-tone"
        style={{
          backgroundColor: `var(--lib-color-${role})`,
          color: textColorForRole(role),
        }}
      >
        {role}
      </div>
      {onRole ? (
        <div
          className="docs-theme-tone"
          style={{
            backgroundColor: `var(--lib-color-${onRole})`,
            color: textColorForRole(onRole),
          }}
        >
          {onRole}
        </div>
      ) : null}
    </>
  );
}

export function ThemePage() {
  useEffect(() => {
    document.title = 'Theme - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Theme</h2>
      <p>
        Vue palette type Material 3, organisee par groupes de roles pour une lecture visuelle rapide.
      </p>

      <DocDemo title="Showcase des rôles de couleur">
        <div className="docs-theme-grid-top">
          {CORE_GROUPS.map((group, index) => (
            <div key={`core-${index}`} className="docs-theme-stack">
              {group.map((entry) => (
                <Swatch key={entry.role} role={entry.role} onRole={entry.onRole} />
              ))}
            </div>
          ))}
        </div>

        <div className="docs-theme-grid-middle">
          <div className="docs-theme-stack docs-theme-surface-main">
            <div className="docs-theme-row docs-theme-row-3">
              {SURFACE_TOP.map((entry) => (
                <div
                  key={entry.role}
                  className="docs-theme-tone"
                  style={{
                    backgroundColor: `var(--lib-color-${entry.role})`,
                    color: textColorForRole(entry.role),
                  }}
                >
                  {entry.role}
                </div>
              ))}
            </div>
            <div className="docs-theme-row docs-theme-row-5">
              {SURFACE_CONTAINERS.map((entry) => (
                <div
                  key={entry.role}
                  className="docs-theme-tone"
                  style={{
                    backgroundColor: `var(--lib-color-${entry.role})`,
                    color: textColorForRole(entry.role),
                  }}
                >
                  {entry.role}
                </div>
              ))}
            </div>
            <div className="docs-theme-row docs-theme-row-4">
              {BOTTOM_ROLES.map((entry) => (
                <div
                  key={entry.role}
                  className="docs-theme-tone"
                  style={{
                    backgroundColor: `var(--lib-color-${entry.role})`,
                    color: textColorForRole(entry.role),
                  }}
                >
                  {entry.role}
                </div>
              ))}
            </div>
          </div>

          <div className="docs-theme-stack docs-theme-side">
            <Swatch role="inverse-surface" onRole="inverse-on-surface" />
            <div
              className="docs-theme-tone"
              style={{
                backgroundColor: 'var(--lib-color-inverse-primary)',
                color: textColorForRole('inverse-primary'),
              }}
            >
              inverse-primary
            </div>
            <div className="docs-theme-row docs-theme-row-2">
              <div
                className="docs-theme-tone"
                style={{ backgroundColor: 'var(--lib-color-scrim)', color: textColorForRole('scrim') }}
              >
                scrim
              </div>
              <div
                className="docs-theme-tone"
                style={{ backgroundColor: 'var(--lib-color-shadow)', color: textColorForRole('shadow') }}
              >
                shadow
              </div>
            </div>
          </div>
        </div>
      </DocDemo>
    </section>
  );
}
