import * as S from './Button.style';

interface IButton {
  /**
   * 버튼 Text
   */
  text: string;
  /**
   * 버튼 type
   */
  size: 'xLarge' | 'large' | 'xRegular' | 'regular' | 'small' | 'xSmall';
  /**
   * color Text
   * (RGB 16진수 형태로 입력 Ex. #000000)
   */
  color: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({
  text,
  size = 'regular',
  color,
  loading = false,
  ...props
}: IButton) => (
  <S.Button size={size} color={color} {...props}>
    {loading ? 'Loading' : text}
  </S.Button>
);

export default Button;
