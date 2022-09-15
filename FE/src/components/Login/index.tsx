import { useEffect } from 'react';

import Button from '../common/Button';

import * as S from './Login.style';

import { Images } from '@/assets/images';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import { githubUrl } from '@/constants/url';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import theme from '@/styles/theme';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverLogin = () => {
  const { naver } = window;
  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.LOCAL_NAVER_CLIENT_ID,
    callbackUrl: 'http://localhost:8080/callback/naver',
    callbackHandle: true,
    loginButton: { color: 'green', type: 3, height: 60 },
    isPopup: false,
  });
  naverLogin.init();
};

const Login = () => {
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);

  useEffect(() => {
    NaverLogin();
  }, []);

  return (
    <S.Login>
      <S.Title>Login</S.Title>
      <Image url={Images.LoginBackground} alt="Login Background" />
      <a href={githubUrl}>
        <Button size="large" color="#191A1C">
          <Text
            size="large"
            text="Github 계정으로 로그인"
            color={theme.color.white}
          />
        </Button>
      </a>
      <div id="naverIdLogin" />
    </S.Login>
  );
};

export default Login;
