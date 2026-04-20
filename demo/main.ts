import {
  applyEveTheme,
  createEveTheme,
  initFocusVisible,
  registerEveElements,
} from '../src/index.js';

initFocusVisible();
registerEveElements();

const applyThemeWhenIdle = (): void => {
  const run = async (): Promise<void> => {
    const theme = await createEveTheme({ hex: '#6750a4' });
    applyEveTheme(theme, { target: document.documentElement, dark: false });
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
