import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseLogin } from '@/hooks/UseLogin';
import { getErrorMessage } from '@/utils/util';

const Callback = () => {
  const navigate = useNavigate();

  const login = () => {
    try {
      const location = window.location.href.split('=')[1];
      const accessToken = location.split('&')[0];
      // api accessToken request
      UseLogin(accessToken, 'naver');
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
