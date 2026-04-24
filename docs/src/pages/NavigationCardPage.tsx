import { useEffect } from 'react';
import { DocDemo } from '../components/DocPrimitives';

export function NavigationCardPage() {
  useEffect(() => {
    document.title = 'Composant Navigation Card - Eve Docs';
  }, []);

  return (
    <section>
      <h2>Navigation Card</h2>
      <p>
        <code>lib-navigation-card</code> pour créer des entrées de navigation interne avec titre, sous-titre
        et icônes optionnelles leading/trailing.
      </p>

      <DocDemo title="Exemples">
        <div className="stack">
          <lib-navigation-card
            title="Tableau de bord"
            subtitle="Vue globale des indicateurs"
            icon-leading="menu"
            icon-trailing="chevron-right"
            href="/styles/theme"
          />
          <lib-navigation-card
            title="Tous les audits"
            subtitle="Historique et filtres avancés"
            icon-leading="check"
            icon-trailing="chevron-right"
            href="/styles/motion"
          />
        </div>
      </DocDemo>
    </section>
  );
}
