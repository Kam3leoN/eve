import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';

const ButtonPage = lazy(() => import('./pages/ButtonPage').then((m) => ({ default: m.ButtonPage })));
const ButtonIconPage = lazy(() => import('./pages/ButtonIconPage').then((m) => ({ default: m.ButtonIconPage })));
const ButtonGroupPage = lazy(() => import('./pages/ButtonGroupPage').then((m) => ({ default: m.ButtonGroupPage })));
const ButtonSplitPage = lazy(() => import('./pages/ButtonSplitPage').then((m) => ({ default: m.ButtonSplitPage })));
const CardPage = lazy(() => import('./pages/CardPage').then((m) => ({ default: m.CardPage })));
const LayoutPage = lazy(() => import('./pages/LayoutPage').then((m) => ({ default: m.LayoutPage })));
const MotionPage = lazy(() => import('./pages/MotionPage').then((m) => ({ default: m.MotionPage })));
const NavigationCardPage = lazy(() =>
  import('./pages/NavigationCardPage').then((m) => ({ default: m.NavigationCardPage })),
);
const ShapePage = lazy(() => import('./pages/ShapePage').then((m) => ({ default: m.ShapePage })));
const LoadingIndicatorPage = lazy(() =>
  import('./pages/LoadingIndicatorPage').then((m) => ({ default: m.LoadingIndicatorPage })),
);
const TextFieldPage = lazy(() => import('./pages/TextFieldPage').then((m) => ({ default: m.TextFieldPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PalettePage = lazy(() => import('./pages/PalettePage').then((m) => ({ default: m.PalettePage })));
const CornerPage = lazy(() => import('./pages/CornerPage').then((m) => ({ default: m.CornerPage })));
const ThemePage = lazy(() => import('./pages/ThemePage').then((m) => ({ default: m.ThemePage })));
const TypographyPage = lazy(() => import('./pages/TypographyPage').then((m) => ({ default: m.TypographyPage })));

export default function App() {
  useEffect(() => {
    const initEve = async () => {
      const base = import.meta.env.BASE_URL;
      const modulePath = `${base}eve/eve.min.mjs`;
      const eve = await import(/* @vite-ignore */ modulePath);
      (window as Window & { Eve?: unknown }).Eve = eve;
      window.Eve?.registerElements?.();
    };

    void initEve();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<Navigate to="/components/button" replace />} />
        <Route
          path="components/button"
          element={
            <Suspense fallback={null}>
              <ButtonPage />
            </Suspense>
          }
        />
        <Route
          path="components/button-icon"
          element={
            <Suspense fallback={null}>
              <ButtonIconPage />
            </Suspense>
          }
        />
        <Route
          path="components/button-group"
          element={
            <Suspense fallback={null}>
              <ButtonGroupPage />
            </Suspense>
          }
        />
        <Route
          path="components/button-split"
          element={
            <Suspense fallback={null}>
              <ButtonSplitPage />
            </Suspense>
          }
        />
        <Route
          path="components/card"
          element={
            <Suspense fallback={null}>
              <CardPage />
            </Suspense>
          }
        />
        <Route
          path="components/navigation-card"
          element={
            <Suspense fallback={null}>
              <NavigationCardPage />
            </Suspense>
          }
        />
        <Route
          path="components/shape"
          element={
            <Suspense fallback={null}>
              <ShapePage />
            </Suspense>
          }
        />
        <Route
          path="components/loading-indicator"
          element={
            <Suspense fallback={null}>
              <LoadingIndicatorPage />
            </Suspense>
          }
        />
        <Route
          path="components/text-field"
          element={
            <Suspense fallback={null}>
              <TextFieldPage />
            </Suspense>
          }
        />
        <Route
          path="styles/typography"
          element={
            <Suspense fallback={null}>
              <TypographyPage />
            </Suspense>
          }
        />
        <Route
          path="styles/theme"
          element={
            <Suspense fallback={null}>
              <ThemePage />
            </Suspense>
          }
        />
        <Route
          path="styles/motion"
          element={
            <Suspense fallback={null}>
              <MotionPage />
            </Suspense>
          }
        />
        <Route
          path="styles/corner"
          element={
            <Suspense fallback={null}>
              <CornerPage />
            </Suspense>
          }
        />
        <Route
          path="styles/layout"
          element={
            <Suspense fallback={null}>
              <LayoutPage />
            </Suspense>
          }
        />
        <Route
          path="styles/palette"
          element={
            <Suspense fallback={null}>
              <PalettePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
