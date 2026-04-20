import { NavLink, Outlet } from 'react-router-dom';

export function DocsLayout() {
  return (
    <div className="docs-shell">
      <aside className="docs-aside">
        <h1>Eve Docs</h1>
        <h2 className="docs-group-title">Composants</h2>
        <nav className="docs-nav" aria-label="Composants">
          <NavLink to="/components/button" end>
            Button
          </NavLink>
        </nav>
      </aside>
      <main className="docs-main">
        <Outlet />
      </main>
    </div>
  );
}
