import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './docs-components.css';

/** Base Vite : `/` en dev → chaîne vide pour React Router (pas `"/"`, sinon les routes ne matchent plus). */
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBase}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
