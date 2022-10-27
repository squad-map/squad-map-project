import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Callback from './pages/Callback';
import Logout from './pages/Logout';
import Verification from './pages/Verification';

const MyPage = lazy(() => import('@/pages/MyPage'));
const HomePage = lazy(() => import('@/pages/Home'));
const MapPage = lazy(() => import('@/pages/Map'));
const SearchMapPage = lazy(() => import('@/pages/SearchMap'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Verification />}>
            <Route path="/map/:id" element={<MapPage />} />
            <Route path="/map/search/:id" element={<SearchMapPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/login/github/callback" element={<Callback />} />
          <Route path="/login/naver/callback" element={<Callback />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
