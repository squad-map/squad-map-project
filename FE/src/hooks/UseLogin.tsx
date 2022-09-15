import { useSetRecoilState } from 'recoil';

import { userState } from '@/recoil/atoms/user';
import { getErrorMessage } from '@/utils/util';

export const UseLogin = async (params: string, sns: string) => {
  const setUser = useSetRecoilState(userState);

  try {
    const response = await fetch(
      `${process.env.SQUAD_MAP_OAUTH_URL}/${sns}${params}`
    );

    const loginData = await response.json();

    if (!Object.hasOwn(loginData, 'userId')) {
      reportError({ message: `로그인 실패` });
    }
    // setCookie (key: ACCESS_TOKEN, value: 받은 accessToken, option: access_token_options)
    // setCookie (key: REFRESH_TOKEN, value: 받은 refreshToken, option: refresh_token_options)
    setUser({
      authId: '1',
      userId: '1',
      username: 'muffin',
      profileImageUrl: '',
    });
  } catch (err) {
    reportError({ message: getErrorMessage(err) });
  }
};

export const UseSilentRefresh = async () => {
  try {
    // const refreshToken = getCookie('refreshToken');
    const response = await fetch(
      `${process.env.SQUAD_MAP_OAUTH_URL}/refresh`,
      {}
    );

    const tokenData = await response.json();
    if (!Object.hasOwn(tokenData, 'userId')) {
      reportError({ message: `토큰 발급 실패` });
    }
    // setCookie
    // setCookie
    // setUser
  } catch (err) {
    reportError({ message: getErrorMessage(err) });
    // delteCookie ?
    // navigate.
  }
};
