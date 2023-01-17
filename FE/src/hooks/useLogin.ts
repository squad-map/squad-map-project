import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { API_URL } from '@/constants/url';
import { userState } from '@/recoil/atoms/user';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
import { getErrorMessage } from '@/utils/util';

export const useLogin = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const SNSLogin = async (code: string, state: string, sns: string) => {
    try {
      const response = await fetch(`${API_URL}/login/${sns}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      });
      const loginData = await response.json();

      if (!Object.hasOwn(loginData.data, 'nickname')) {
        reportError({ message: `로그인 실패` });
      }

      setCookie('access_token', loginData.data.access_token, {
        path: '/',
      });
      setCookie('refresh_token', loginData.data.refresh_token, {
        path: '/',
      });

      setUser({
        member_id: loginData.data.member_id,
        nickname: loginData.data.nickname,
        profileImageUrl: loginData.data.profile_image,
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

      const response = await fetch(`${API_URL}/login`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
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
        member_id: refreshData.member_id,
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
