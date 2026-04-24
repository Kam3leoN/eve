import { NavLink, Outlet, useLocation } from 'react-router-dom';

export function DocsLayout() {
  const location = useLocation();
  const navItems = [
    { path: '/components/button', title: 'Button' },
    { path: '/components/button-icon', title: 'Button Icon' },
    { path: '/components/button-group', title: 'Button Group' },
    { path: '/components/button-split', title: 'Button Split' },
    { path: '/components/card', title: 'Card' },
    { path: '/components/navigation-card', title: 'Navigation Card' },
    { path: '/components/shape', title: 'Shape' },
    { path: '/components/loading-indicator', title: 'Loading Indicator' },
    { path: '/components/text-field', title: 'Text Field' },
    { path: '/styles/theme', title: 'Theme' },
    { path: '/styles/motion', title: 'Motion' },
    { path: '/styles/corner', title: 'Corner' },
    { path: '/styles/layout', title: 'Layout' },
    { path: '/styles/typography', title: 'Typography' },
    { path: '/styles/palette', title: 'Palette' },
  ] as const;
  const idx = navItems.findIndex((it) => it.path === location.pathname);
  const previous = idx > 0 ? navItems[idx - 1] : null;
  const next = idx >= 0 && idx < navItems.length - 1 ? navItems[idx + 1] : null;

  return (
    <div className="container" style={{ minHeight: '100dvh', paddingBlock: '1rem' }}>
      <div className="row g-3">
        <aside className="s12 l3 xl2" style={{ position: 'sticky', top: '1rem', height: 'fit-content' }}>
          <lib-card variant="outlined">
            <h1 slot="headline">Eve Docs</h1>
            <div slot="supporting" className="stack" style={{ gap: '1rem' }}>
              <section>
                <h2 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Composants
                </h2>
                <nav aria-label="Composants" className="stack" style={{ gap: '0.35rem', marginTop: '0.45rem' }}>
                  {navItems.slice(0, 9).map((item) => (
                    <NavLink key={item.path} to={item.path} end>
                      {({ isActive }) => (
                        <lib-button variant={isActive ? 'filled' : 'text'} style={{ width: '100%', justifyContent: 'start' }}>
                          {item.title}
                        </lib-button>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </section>
              <section>
                <h2 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Styles
                </h2>
                <nav aria-label="Styles" className="stack" style={{ gap: '0.35rem', marginTop: '0.45rem' }}>
                  {navItems.slice(9).map((item) => (
                    <NavLink key={item.path} to={item.path} end>
                      {({ isActive }) => (
                        <lib-button variant={isActive ? 'filled' : 'text'} style={{ width: '100%', justifyContent: 'start' }}>
                          {item.title}
                        </lib-button>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </section>
            </div>
          </lib-card>
        </aside>
        <main className="s12 l9 xl10">
          <lib-card variant="outlined" style={{ minHeight: '100%' }}>
            <div slot="supporting">
          <Outlet />
          <div style={{ marginTop: '1rem', paddingTop: '1rem' }}>
            <div className="row g-2">
              {previous ? (
                <div className="s12 m6">
                  <lib-navigation-card
                    title="Previous"
                    subtitle={previous.title}
                    icon-leading="menu"
                    icon-trailing="chevron-right"
                    href={previous.path}
                  />
                </div>
              ) : null}
              {next ? (
                <div className="s12 m6">
                  <lib-navigation-card
                    title="Up next"
                    subtitle={next.title}
                    icon-leading="check"
                    icon-trailing="chevron-right"
                    href={next.path}
                  />
                </div>
              ) : null}
            </div>
          </div>
            </div>
          </lib-card>
        </main>
      </div>
    </div>
  );
}
