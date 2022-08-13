import Button from '../common/Button';

import * as S from './Login.style';

import { Images } from '@/assets/images';
import Image from '@/components/common/Image';

const Login = () => (
  <S.Login>
    <S.Title>Login</S.Title>
    <Image url={Images.LoginBackground} alt="Login Background" />
    <Button size="large" text="Github 계정으로 로그인" color="#191A1C" />
    <Button size="large" text="Naver 계정으로 로그인" color="#17CE5F" />
  </S.Login>
);

export default Login;
