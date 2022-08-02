import * as S from './Button.style';

interface ILoginButton {
  children: React.ReactNode;
  textColor: string;
  bgColor: string;
}

export const LoginButton = ({
  children,
  textColor,
  bgColor,
  ...props
}: ILoginButton) => (
  <S.LoginButton
    type="button"
    textColor={textColor}
    bgColor={bgColor}
    {...props}
  >
    {children}
  </S.LoginButton>
);
