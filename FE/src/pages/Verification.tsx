import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { UseSilentRefresh } from '@/hooks/UseLogin';

const Verification = () => {
  const isLoggedIn = useIsLoggedIn();
  const SilentRefresh = UseSilentRefresh();

  useEffect(() => {
    if (isLoggedIn) return;

    SilentRefresh('/error');
  }, [isLoggedIn, SilentRefresh]);

  return !isLoggedIn ? <div>로딩중...</div> : <Outlet />;
};

export default Verification;
