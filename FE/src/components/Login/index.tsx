import Button from '../common/Button';

import * as S from './Login.style';

import { Images } from '@/assets/images';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

const Login = () => (
  <S.Login>
    <S.Title>Login</S.Title>
    <Image url={Images.LoginBackground} alt="Login Background" />
    <Button size="large" color="#191A1C">
      <Text
        size="large"
        text="Github 계정으로 로그인"
        color={theme.color.white}
      />
    </Button>
    <Button size="large" color="#17CE5F">
      <Text
        size="large"
        text="Naver 계정으로 로그인"
        color={theme.color.white}
      />
    </Button>
  </S.Login>
);

export default Login;
