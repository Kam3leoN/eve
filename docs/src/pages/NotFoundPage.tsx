import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DocDemo } from '../components/DocPrimitives';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page non trouvée - Eve Docs';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', "La page demandée n'existe pas dans la documentation Eve.");
  }, []);

  return (
    <section>
      <h2>404 - Page de documentation introuvable</h2>
      <p>La route demandée ne correspond à aucune page enregistrée.</p>
      <DocDemo title="Navigation">
        <p>
          <Link to="/components/button">Retour à Button</Link>
        </p>
      </DocDemo>
    </section>
  );
}
