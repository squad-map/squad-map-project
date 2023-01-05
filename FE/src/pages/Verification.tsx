import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { getCookie } from '@/utils/cookie';

const Verification = () => {
  // accessToken의 만료시간이 지났다면, UseSilentRefresh 훅 호출 예정.
  const accessToken = getCookie('access_token');
  const isLoggedIn = useIsLoggedIn();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && accessToken) return;

    navigate('/login');
  }, [isLoggedIn, navigate, accessToken]);

  return <Outlet />;
};

export default Verification;
