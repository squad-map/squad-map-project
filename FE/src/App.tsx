import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Callback from './pages/Callback';
import Verification from './pages/Verification';

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
          <Route element={<Verification />}>
            <Route path="/maps/:id" element={<MapsPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mymap/:id" element={<MyMapPage />} />
          </Route>
          <Route path="/callback/:provider" element={<Callback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
