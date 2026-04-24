import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { ButtonPage } from './pages/ButtonPage';
import { ButtonIconPage } from './pages/ButtonIconPage';
import { ButtonGroupPage } from './pages/ButtonGroupPage';
import { ButtonSplitPage } from './pages/ButtonSplitPage';
import { CardPage } from './pages/CardPage';
import { LayoutPage } from './pages/LayoutPage';
import { MotionPage } from './pages/MotionPage';
import { NavigationCardPage } from './pages/NavigationCardPage';
import { ShapePage } from './pages/ShapePage';
import { LoadingIndicatorPage } from './pages/LoadingIndicatorPage';
import { TextFieldPage } from './pages/TextFieldPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PalettePage } from './pages/PalettePage';
import { CornerPage } from './pages/CornerPage';
import { ThemePage } from './pages/ThemePage';
import { TypographyPage } from './pages/TypographyPage';

export default function App() {
  useEffect(() => {
    window.Eve?.registerElements?.();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<Navigate to="/components/button" replace />} />
        <Route path="components/button" element={<ButtonPage />} />
        <Route path="components/button-icon" element={<ButtonIconPage />} />
        <Route path="components/button-group" element={<ButtonGroupPage />} />
        <Route path="components/button-split" element={<ButtonSplitPage />} />
        <Route path="components/card" element={<CardPage />} />
        <Route path="components/navigation-card" element={<NavigationCardPage />} />
        <Route path="components/shape" element={<ShapePage />} />
        <Route path="components/loading-indicator" element={<LoadingIndicatorPage />} />
        <Route path="components/text-field" element={<TextFieldPage />} />
        <Route path="styles/typography" element={<TypographyPage />} />
        <Route path="styles/theme" element={<ThemePage />} />
        <Route path="styles/motion" element={<MotionPage />} />
        <Route path="styles/corner" element={<CornerPage />} />
        <Route path="styles/layout" element={<LayoutPage />} />
        <Route path="styles/palette" element={<PalettePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
