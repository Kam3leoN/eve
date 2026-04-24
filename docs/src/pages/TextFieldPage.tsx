import { useEffect, useRef, useState } from 'react';
import { DocCodeBlock, DocDemo, DocRow, DocSubsectionTitle } from '../components/DocPrimitives';

export function TextFieldPage() {
  const validationRef = useRef<HTMLElement | null>(null);
  const [validationMessage, setValidationMessage] = useState('Aucune validation lancée');

  useEffect(() => {
    document.title = 'Composant Text Field - Eve Docs';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Text Field M3 Expressive: filled, outlined, validation native, icons, prefix/suffix, RTL, API méthodes.',
    );
  }, []);

  const runCheckValidity = () => {
    const el = validationRef.current as unknown as { checkValidity: () => boolean } | null;
    if (!el) return;
    setValidationMessage(el.checkValidity() ? 'Champ valide' : 'Champ invalide');
  };

  const runReportValidity = () => {
    const el = validationRef.current as unknown as { reportValidity: () => boolean } | null;
    if (!el) return;
    setValidationMessage(el.reportValidity() ? 'reportValidity: OK' : 'reportValidity: erreur');
  };

  const setCustomError = () => {
    const el = validationRef.current as unknown as { setCustomValidity: (msg: string) => void } | null;
    if (!el) return;
    el.setCustomValidity('Erreur personnalisée (demo).');
    setValidationMessage('Erreur personnalisée appliquée');
  };

  const clearCustomError = () => {
    const el = validationRef.current as unknown as { setCustomValidity: (msg: string) => void } | null;
    if (!el) return;
    el.setCustomValidity('');
    setValidationMessage('Erreur personnalisée supprimée');
  };

  return (
    <section>
      <h2>Text Field</h2>
      <p>
        Web Component <code>lib-text-field</code> aligné Material 3 Expressive, avec variantes{' '}
        <code>filled</code> et <code>outlined</code>.
      </p>

      <DocDemo title="Variantes">
        <DocRow ariaLabel="Variantes text field">
          <lib-text-field label="Filled" value="Valeur" variant="filled" />
          <lib-text-field label="Outlined" value="Valeur" variant="outlined" />
        </DocRow>
      </DocDemo>

      <DocDemo title="États">
        <DocSubsectionTitle>Enabled / Disabled / Readonly / Error</DocSubsectionTitle>
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field label="Enabled" supporting-text="Texte d'aide" variant="filled" />
            <lib-text-field label="Disabled" value="Désactivé" disabled variant="filled" />
            <lib-text-field label="Readonly" value="Lecture seule" readonly variant="filled" />
            <lib-text-field label="Erreur" error error-text="Valeur invalide" value="abc" variant="filled" />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field label="Enabled" supporting-text="Texte d'aide" variant="outlined" />
            <lib-text-field label="Disabled" value="Désactivé" disabled variant="outlined" />
            <lib-text-field label="Readonly" value="Lecture seule" readonly variant="outlined" />
            <lib-text-field label="Erreur" error error-text="Valeur invalide" value="abc" variant="outlined" />
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Icônes et décorations">
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field label="Recherche" icon-leading="menu" placeholder="Rechercher..." variant="filled" />
            <lib-text-field label="Libellé" icon-trailing="close" variant="filled" />
            <lib-text-field label="Montant" prefix-text="$" suffix-text=".00" value="150" variant="filled" />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field label="Recherche" icon-leading="menu" placeholder="Rechercher..." variant="outlined" />
            <lib-text-field label="Libellé" icon-trailing="close" variant="outlined" />
            <lib-text-field label="Montant" prefix-text="$" suffix-text=".00" value="150" variant="outlined" />
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Alignement du texte (left / right)">
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field label="Poids (g)" value="1250" suffix-text="g" text-align="left" variant="filled" />
            <lib-text-field label="Montant (€)" value="2500.00" prefix-text="€" text-align="right" variant="filled" />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field label="Poids (g)" value="1250" suffix-text="g" text-align="left" variant="outlined" />
            <lib-text-field label="Montant (€)" value="2500.00" prefix-text="€" text-align="right" variant="outlined" />
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Supporting text, validation native et compteur">
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field
              label="Titre"
              supporting-text="10 caractères max"
              maxlength="10"
              value="Court"
              variant="filled"
            />
            <lib-text-field
              label="Email"
              type="email"
              required
              supporting-text="Format email requis"
              error-text="Adresse email invalide"
              placeholder="email@domain.com"
              variant="filled"
            />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field
              label="Titre"
              supporting-text="10 caractères max"
              maxlength="10"
              value="Court"
              variant="outlined"
            />
            <lib-text-field
              label="Email"
              type="email"
              required
              supporting-text="Format email requis"
              error-text="Adresse email invalide"
              placeholder="email@domain.com"
              variant="outlined"
            />
          </div>
        </div>
      </DocDemo>

      <DocDemo title="Méthodes API (check/report/setCustomValidity)">
        <DocRow>
          <lib-text-field
            ref={(node) => {
              validationRef.current = node;
            }}
            label="Champ à valider"
            required
            pattern="[A-Za-z]{3,}"
            supporting-text="Minimum 3 lettres"
            error-text="Entrer au moins 3 lettres"
            variant="outlined"
          />
        </DocRow>
        <DocRow>
          <lib-button variant="outlined" onClick={runCheckValidity}>
            checkValidity()
          </lib-button>
          <lib-button variant="outlined" onClick={runReportValidity}>
            reportValidity()
          </lib-button>
          <lib-button variant="outlined" onClick={setCustomError}>
            setCustomValidity(error)
          </lib-button>
          <lib-button variant="text" onClick={clearCustomError}>
            clear custom validity
          </lib-button>
        </DocRow>
        <p style={{ margin: 0 }}>{validationMessage}</p>
      </DocDemo>

      <DocDemo title="Mot de passe : affichage, politique, génération">
        <DocSubsectionTitle>Visibilité + génération (attributs)</DocSubsectionTitle>
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field
              label="Mot de passe"
              type="password"
              password-toggle
              password-generate
              supporting-text="Afficher / masquer et générer (politique par défaut si aucun min-*)"
              variant="filled"
            />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field
              label="Mot de passe"
              type="password"
              password-toggle
              password-generate
              supporting-text="Afficher / masquer et générer (politique par défaut si aucun min-*)"
              variant="outlined"
            />
          </div>
        </div>
        <DocSubsectionTitle>Politique personnalisée (validation native)</DocSubsectionTitle>
        <div className="docs-text-field-two-col">
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Filled</p>
            <lib-text-field
              label="Mot de passe fort"
              type="password"
              password-toggle
              password-generate
              password-min-length="10"
              password-min-lower="1"
              password-min-upper="1"
              password-min-digit="1"
              password-min-special="1"
              supporting-text="Contraintes : longueur + minuscules, majuscules, chiffres, spéciaux"
              variant="filled"
            />
          </div>
          <div className="docs-text-field-col">
            <p className="docs-text-field-col-title">Outlined</p>
            <lib-text-field
              label="Mot de passe fort"
              type="password"
              password-toggle
              password-generate
              password-min-length="10"
              password-min-lower="1"
              password-min-upper="1"
              password-min-digit="1"
              password-min-special="1"
              supporting-text="Contraintes : longueur + minuscules, majuscules, chiffres, spéciaux"
              variant="outlined"
            />
          </div>
        </div>
      </DocDemo>

      <DocDemo
        title="Direction RTL"
        description="Les autres démos de la page sont en LTR ; ici filled et outlined en contexte RTL, même disposition que la section « Variantes »."
        dir="rtl"
      >
        <DocRow ariaLabel="Champs text field en RTL (filled + outlined)">
          <lib-text-field label="الاسم" value="قيمة" supporting-text="Filled" icon-leading="check" variant="filled" />
          <lib-text-field label="الاسم" value="قيمة" supporting-text="Outlined" icon-leading="check" variant="outlined" />
        </DocRow>
      </DocDemo>

      <DocDemo title="Code">
        <DocCodeBlock>{`<lib-text-field label="Nom" variant="filled"></lib-text-field>
<lib-text-field label="Email" variant="outlined" type="email" required></lib-text-field>
<lib-text-field label="Montant" prefix-text="$" suffix-text=".00" value="10"></lib-text-field>
<lib-text-field label="Montant (€)" prefix-text="€" value="2500.00" text-align="right"></lib-text-field>
<lib-text-field label="Titre" maxlength="10" supporting-text="10 caractères max"></lib-text-field>
<lib-text-field label="Pseudo" error error-text="Déjà pris"></lib-text-field>

<div dir="rtl">
  <lib-text-field label="الاسم" value="قيمة" icon-leading="check" variant="filled"></lib-text-field>
  <lib-text-field label="الاسم" value="قيمة" variant="outlined" icon-leading="check"></lib-text-field>
</div>`}</DocCodeBlock>
      </DocDemo>
    </section>
  );
}
