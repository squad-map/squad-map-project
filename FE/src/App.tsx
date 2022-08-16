import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MyPage = lazy(() => import('@/pages/MyPage'));
const MyPageDetail = lazy(() => import('@/pages/MyPage/Detail'));
const HomePage = lazy(() => import('@/pages/Home'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route path="new" element={<MyPageDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
