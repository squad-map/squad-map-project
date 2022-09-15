import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UseLogin } from '@/hooks/UseLogin';
import { getErrorMessage } from '@/utils/util';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const SNSLogin = UseLogin();

  const login = () => {
    try {
      // 우선 네버 로그인 기준으로 데이터 파싱.
      const locationParams = window.location.href.split('=')[1];
      const accessToken = locationParams.split('&')[0];
      const provider = location.pathname.split('/').pop() as string;

      // api accessToken request
      SNSLogin(accessToken, provider);
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    } finally {
      navigate('/');
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <div>Redierct...</div>;
};

export default Callback;
