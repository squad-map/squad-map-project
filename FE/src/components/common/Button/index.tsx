import React from 'react';

import * as S from './Button.style';

interface IButton {
  /**
   * 버튼 type
   */
  size: 'xLarge' | 'large' | 'xRegular' | 'regular' | 'small' | 'xSmall';
  /**
   * color Text
   * (RGB 16진수 형태로 입력 Ex. #000000)
   */
  type?: 'button' | 'submit' | 'reset';
  color: string;
  background?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e?: React.SyntheticEvent | any) => void;
  className?: string;
}

const Button = ({
  type = 'button',
  size = 'regular',
  color,
  children,
  className,
  ...props
}: IButton) => (
  <S.Button
    type={type}
    size={size}
    color={color}
    className={className}
    {...props}
  >
    {children}
  </S.Button>
);

export default Button;
