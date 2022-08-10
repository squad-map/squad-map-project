import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AllMapsPage = lazy(() => import('@/pages/AllMapsPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<AllMapsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
