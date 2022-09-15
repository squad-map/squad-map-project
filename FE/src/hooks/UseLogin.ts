import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { userState } from '@/recoil/atoms/user';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
import { getErrorMessage } from '@/utils/util';

export const UseLogin = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const SNSLogin = async (params: string, sns: string) => {
    try {
      // const response = await fetch(
      //   `${process.env.SQUAD_MAP_OAUTH_URL}/${sns}${params}`
      // );

      // const loginData = await response.json();
      const loginData = {
        accessToken: 'muffin_accessToken',
        refreshToken: 'muffin_refreshToken',
        nickname: 'muffin',
        profileImageUrl:
          'https://w.namu.la/s/7cab72cebf334078cb60ad2d292e30f9172354e14440789a2002472fa13216f07c443819e7c14712c94707837e8a0c48b8e69b816e6f29d33bdc4ed975e95ae09175e79b553e19e439571c16520327e2ad85aa14c009e848426ef11b0ab166eb',
      };

      if (!Object.hasOwn(loginData, 'nickname')) {
        reportError({ message: `로그인 실패` });
      }

      const expires = new Date();
      setCookie('access_token', loginData.accessToken, {
        expires,
      });
      setCookie('refresh_token', loginData.refreshToken, { expires });
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

      // const response = await fetch(
      //   `${process.env.SQUAD_MAP_OAUTH_URL}/refresh`,
      //   { headers: {
      //  Authorization: `Barer ${refreshToken}`;
      // }}
      // );

      // const refreshData = await response.json();
      const refreshData = {
        accessToken: 'muffin_accessToken',
        refreshToken: 'muffin_refreshToken',
        nickname: 'muffin',
        profileImageUrl:
          'https://w.namu.la/s/7cab72cebf334078cb60ad2d292e30f9172354e14440789a2002472fa13216f07c443819e7c14712c94707837e8a0c48b8e69b816e6f29d33bdc4ed975e95ae09175e79b553e19e439571c16520327e2ad85aa14c009e848426ef11b0ab166eb',
      };

      if (!Object.hasOwn(refreshData, 'nickname')) {
        reportError({ message: `토큰 발급 실패` });
      }

      setCookie('access_token', refreshData.accessToken);
      setCookie('refresh_token', refreshData.refreshToken);
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
