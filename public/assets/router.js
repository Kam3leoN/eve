const app = document.getElementById('app');
const pageLinksSelector = 'a[data-link]';
const parser = new DOMParser();

const isInternalLink = (anchor) => {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) {
    return false;
  }

  const url = new URL(anchor.href, window.location.origin);
  return url.origin === window.location.origin;
};

const updateActiveNav = (pathname) => {
  document.querySelectorAll(pageLinksSelector).forEach((link) => {
    const isActive = new URL(link.href, window.location.origin).pathname === pathname;
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const navigate = async (targetUrl, pushHistory = true) => {
  if (!app) {
    return;
  }

  const url = new URL(targetUrl, window.location.origin);
  url.searchParams.set('fragment', '1');

  const response = await fetch(url.toString(), {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    window.location.href = targetUrl;
    return;
  }

  const html = await response.text();
  const doc = parser.parseFromString(html, 'text/html');
  app.innerHTML = doc.body.innerHTML || html;

  const cleanUrl = new URL(targetUrl, window.location.origin);
  document.title = cleanUrl.pathname.includes('/button.php')
    ? 'Eve Demo - Buttons'
    : 'Eve Demo - Accueil';

  if (pushHistory) {
    window.history.pushState({}, '', cleanUrl.toString());
  }

  updateActiveNav(cleanUrl.pathname);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest(pageLinksSelector);
  if (!(anchor instanceof HTMLAnchorElement)) {
    return;
  }

  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.target === '_blank'
  ) {
    return;
  }

  if (!isInternalLink(anchor)) {
    return;
  }

  event.preventDefault();
  void navigate(anchor.href, true);
});

window.addEventListener('popstate', () => {
  void navigate(window.location.href, false);
});
