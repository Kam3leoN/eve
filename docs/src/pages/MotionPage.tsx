import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

const DURATION_TOKENS = [
  'short1',
  'short2',
  'short3',
  'short4',
  'medium1',
  'medium2',
  'medium3',
  'medium4',
  'long1',
  'long2',
  'long3',
  'long4',
  'extra-long1',
  'extra-long2',
  'extra-long3',
  'extra-long4',
] as const;

const EASING_TOKENS = ['emphasized', 'emphasized-decelerate', 'emphasized-accelerate'] as const;
const SPRING_SCHEMAS = [
  'default-spatial',
  'fast-spatial',
  'slow-spatial',
  'default-effects',
  'fast-effects',
  'slow-effects',
] as const;

export function MotionPage() {
  useEffect(() => {
    document.title = 'Motion - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Motion</h2>
      <p>
        Tokens motion M3 Expressive exposes en <code>--md-sys-motion-*</code> avec aliases
        <code> --lib-motion-*</code>.
      </p>

      <DocDemo
        title="Spring schema (Expressive officiel)"
        description="Valeurs issues des tokens officiels AndroidX Material 3 Expressive (damping/stiffness): default/fast/slow pour spatial et effects."
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="eve-docs-table">
            <thead>
              <tr>
                <th>Schema</th>
                <th>Systeme damping</th>
                <th>Systeme stiffness</th>
                <th>Lib damping</th>
                <th>Lib stiffness</th>
              </tr>
            </thead>
            <tbody>
              {SPRING_SCHEMAS.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <code>{`--md-sys-motion-spring-${name}-damping`}</code>
                  </td>
                  <td>
                    <code>{`--md-sys-motion-spring-${name}-stiffness`}</code>
                  </td>
                  <td>
                    <code>{`--lib-motion-spring-${name}-damping`}</code>
                  </td>
                  <td>
                    <code>{`--lib-motion-spring-${name}-stiffness`}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocDemo>

      <DocDemo title="Durations">
        <div style={{ overflowX: 'auto' }}>
          <table className="eve-docs-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Systeme</th>
                <th>Lib</th>
              </tr>
            </thead>
            <tbody>
              {DURATION_TOKENS.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <code>{`--md-sys-motion-duration-${name}`}</code>
                  </td>
                  <td>
                    <code>{`--lib-motion-duration-${name}`}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocDemo>

      <DocDemo title="Easings">
        <div style={{ overflowX: 'auto' }}>
          <table className="eve-docs-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Systeme</th>
                <th>Lib</th>
              </tr>
            </thead>
            <tbody>
              {EASING_TOKENS.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <code>{`--md-sys-motion-easing-${name}`}</code>
                  </td>
                  <td>
                    <code>{`--lib-motion-easing-${name}`}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocDemo>
    </section>
  );
}
