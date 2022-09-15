import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Callback from './pages/Callback';

const MyPage = lazy(() => import('@/pages/MyPage'));
const HomePage = lazy(() => import('@/pages/Home'));
const MapsPage = lazy(() => import('@/pages/Maps'));
const MyMapPage = lazy(() => import('@/pages/MyMap'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/maps/:id" element={<MapsPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mymap/:id" element={<MyMapPage />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
