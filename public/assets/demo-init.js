(function initializeEveDemo() {
  const initializedKey = '__eve_demo_initialized__';
  if (window[initializedKey]) {
    return;
  }

  const eveApi = window.Eve;
  if (!eveApi) {
    return;
  }

  eveApi.initFocusVisible();
  eveApi.registerEveElements();

  const applyThemeWhenIdle = () => {
    const run = async () => {
      const theme = await eveApi.createEveTheme({ hex: '#6750a4' });
      eveApi.applyEveTheme(theme, { target: document.documentElement, dark: false });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        void run();
      });
      return;
    }

    globalThis.setTimeout(() => {
      void run();
    }, 0);
  };

  applyThemeWhenIdle();
  window[initializedKey] = true;
})();
