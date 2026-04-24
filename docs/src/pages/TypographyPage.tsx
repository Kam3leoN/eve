import { useEffect } from 'react';
import { DocCodeBlock, DocDemo } from '../components/DocPrimitives';

const TYPO_ROLES = [
  'display-large',
  'display-medium',
  'display-small',
  'headline-large',
  'headline-medium',
  'headline-small',
  'title-large',
  'title-medium',
  'title-small',
  'body-large',
  'body-medium',
  'body-small',
  'label-large',
  'label-medium',
  'label-small',
] as const;

export function TypographyPage() {
  useEffect(() => {
    document.title = 'Typographie - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Typography</h2>
      <p>
        Demo des tokens Material 3 via classes utilitaires: <code>display-*</code>,{' '}
        <code>headline-*</code>, <code>title-*</code>, <code>body-*</code>, <code>label-*</code>.
      </p>

      <DocDemo title="Echelle complète">
        <div className="docs-typo-stack">
          {TYPO_ROLES.map((role) => (
            <div key={role} className="docs-typo-row">
              <code>{role}</code>
              <p className={role}>The quick brown fox jumps over the lazy dog 123</p>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo
        title="Landing"
        description={
          <>
            Utilitaire dedie au contexte landing/hero: <code>landing</code> (ou <code>liblanding</code>) +{' '}
            <code>docs-landing</code>.
          </>
        }
      >
        <p className="landing docs-landing display-medium docs-landing-sample">
          LANDING HEADLINE
        </p>
      </DocDemo>

      <DocDemo title="Snippet">
        <DocCodeBlock>{`<p class="display-large">Display large</p>
<p class="headline-medium">Headline medium</p>
<p class="title-small">Title small</p>
<p class="body-large">Body large</p>
<p class="label-medium">Label medium</p>
<p class="landing display-medium">Landing headline</p>`}</DocCodeBlock>
      </DocDemo>

      <DocDemo
        title="Google Sans: fallback reseau / self-host"
        description="La lib ne force pas le chargement distant. Cote application, heberge la police localement pour eviter les soucis reseau/CDN."
      >
        <DocCodeBlock>{`/* Exemple integrateur (self-host recommande) */
@font-face {
  font-family: "Google Sans Flex";
  src: url("/fonts/GoogleSansFlex-VariableFont.woff2") format("woff2-variations");
  font-weight: 100 1000;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("/fonts/JetBrainsMono-VariableFont_wght.woff2") format("woff2-variations");
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Burbank Big";
  src: url("/fonts/BurbankBigCondensed-Black.woff2") format("woff2");
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}

:root {
  --lib-type-font-family-sans:
    "Google Sans Flex",
    system-ui,
    "Segoe UI",
    Roboto,
    sans-serif;
  --lib-type-font-family-jetbrains:
    "JetBrains Mono",
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;
  --md-ref-typeface-code: var(--lib-type-font-family-jetbrains);
  --lib-ref-typeface-landing:
    "Burbank Big",
    var(--lib-type-font-family-sans);
  --docs-font-landing:
    "Burbank Big",
    var(--lib-type-font-family-sans);
}`}</DocCodeBlock>
      </DocDemo>
    </section>
  );
}
