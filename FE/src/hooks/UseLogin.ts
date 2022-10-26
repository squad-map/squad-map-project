import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { userState } from '@/recoil/atoms/user';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
import { getErrorMessage } from '@/utils/util';

export const UseLogin = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const SNSLogin = async (code: string, state: string, sns: string) => {
    try {
      const response = await fetch(
        `${process.env.SQUAD_MAP_OAUTH_URL}/login/${sns}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        }
      );
      const loginData = await response.json();

      if (!Object.hasOwn(loginData, 'nickname')) {
        reportError({ message: `로그인 실패` });
      }

      setCookie('access_token', loginData.access_token, {
        path: '/',
      });
      setCookie('refresh_token', loginData.refresh_token, {
        path: '/',
      });

      setUser({
        nickname: loginData.nickname,
        profileImageUrl: loginData.profileImageUrl,
      });
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    } finally {
      navigate('/');
    }
  };

  return SNSLogin;
};

export const UseSilentRefresh = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const SilentRefresh = async (fallbackURL = '/') => {
    try {
      const refreshToken = getCookie('refresh_token');

      const response = await fetch(`${process.env.SQUAD_MAP_OAUTH_URL}/login`, {
        headers: {
          Authorization: `Barer ${refreshToken}`,
        },
      });

      const refreshData = await response.json();

      if (!Object.hasOwn(refreshData, 'nickname')) {
        reportError({ message: `토큰 발급 실패` });
      }

      setCookie('access_token', refreshData.access_token, {
        path: '/',
      });
      setCookie('refresh_token', refreshData.refresh_token, {
        path: '/',
      });
      // setUser
      setUser({
        nickname: refreshData.nickname,
        profileImageUrl: refreshData.profileImageUrl,
      });
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
      removeCookie('access_token');
      removeCookie('refresh_token');
    } finally {
      navigate(fallbackURL);
    }
  };
  return SilentRefresh;
};
