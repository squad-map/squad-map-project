import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoadingSpinner from './components/common/LoadingSpinner';
import Callback from './pages/Callback';
import Logout from './pages/Logout';
import Verification from './pages/Verification';

const MyPage = lazy(() => import('@/pages/MyPage'));
const LoginPage = lazy(() => import('@/pages/Login'));
const CreateMapPage = lazy(() => import('@/pages/MapForm'));
const ModifyMapPage = lazy(() => import('@/pages/MapForm'));
const HomePage = lazy(() => import('@/pages/Home'));
const MapPage = lazy(() => import('@/pages/Map'));
const SearchMapPage = lazy(() => import('@/pages/SearchMap'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner size="xLarge" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Verification />}>
            <Route path="/map/:id" element={<MapPage />} />
            <Route path="/map/search/:id" element={<SearchMapPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/create" element={<CreateMapPage />} />
            <Route path="/mypage/modify/:id" element={<ModifyMapPage />} />
          </Route>
          <Route path="/login/github/callback" element={<Callback />} />
          <Route path="/login/naver/callback" element={<Callback />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
