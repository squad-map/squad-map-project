import { useEffect } from 'react';
import { v4 } from 'uuid';

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

const Login = () => {
  const isLoggedIn = useIsLoggedIn();
  const state = v4();

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (isLoggedIn) return;
  }, [isLoggedIn, state]);

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
      <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.SQUAD_MAP_NAVER_CLIENT_ID}&redirect_uri=${process.env.SQUAD_MAP_NAVER_CALLBACK_URL}&state=${state}`}
      >
        <Button size="large" color={theme.color.green}>
          <Text
            size="large"
            text="Naver 계정으로 로그인"
            color={theme.color.white}
          />
        </Button>
      </a>
    </S.Login>
  );
};

export default Login;
