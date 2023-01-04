import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { userState } from '@/recoil/atoms/user';
import { removeCookie } from '@/utils/cookie';

const Logout = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser(null);
    removeCookie('access_token');
    removeCookie('refresh_token');
    navigate('/');
  }, [navigate, setUser]);

  return <LoadingSpinner size="large" />;
};

export default Logout;
