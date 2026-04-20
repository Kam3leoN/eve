import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Base : `/` en local ; sur GitHub Pages `/${repo}/` dérivé de GITHUB_REPOSITORY.
 * Variables attendues en CI (comme dynaperf) : GITHUB_ACTIONS + GITHUB_PAGES.
 */
function resolveBase(): string {
  const isGitHubPagesBuild =
    process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_PAGES === 'true';
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (isGitHubPagesBuild && repo) {
    return `/${repo}/`;
  }
  return '/';
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
});
