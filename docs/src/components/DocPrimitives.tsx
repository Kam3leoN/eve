import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

type DocDemoProps = PropsWithChildren<{
  title?: ReactNode;
  description?: ReactNode;
  style?: CSSProperties;
  dir?: 'ltr' | 'rtl' | 'auto';
}>;

export function DocDemo({ title, description, children, style, dir }: DocDemoProps) {
  return (
    <lib-card variant="outlined" style={{ marginTop: '1rem', ...style }} dir={dir}>
      {title ? <h3 slot="headline">{title}</h3> : null}
      {description ? <p slot="supporting">{description}</p> : null}
      <div slot="supporting" className="stack" style={{ gap: '0.85rem' }}>
        {children}
      </div>
    </lib-card>
  );
}

export function DocRow(props: PropsWithChildren<{ ariaLabel?: string; dir?: 'ltr' | 'rtl' | 'auto' }>) {
  return (
    <div
      className="cluster"
      aria-label={props.ariaLabel}
      dir={props.dir}
      style={{ alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}
    >
      {props.children}
    </div>
  );
}

export function DocSubsectionTitle({ children }: PropsWithChildren) {
  return <p style={{ margin: '0.5rem 0 0.15rem', fontWeight: 600 }}>{children}</p>;
}

export function DocCodeBlock({ children }: PropsWithChildren) {
  return (
    <pre
      style={{
        margin: 0,
        padding: '0.75rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--lib-color-outline-variant, #e5e7eb)',
        background: 'var(--lib-color-surface-container-low)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}
