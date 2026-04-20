import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { ButtonPage } from './pages/ButtonPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  useEffect(() => {
    window.Eve?.registerEveElements?.();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<Navigate to="/components/button" replace />} />
        <Route path="components/button" element={<ButtonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
