import * as S from './Text.style';

interface IText {
  text: string;
  size:
    | 'xLargeFill'
    | 'xLarge'
    | 'large'
    | 'xRegularFill'
    | 'xRegular'
    | 'regular'
    | 'small'
    | 'xSmall';
  color: string;
  hover?: boolean;
}

const Text = ({ text, size = 'regular', color, ...props }: IText) => (
  <S.Text size={size} color={color} {...props}>
    {text}
  </S.Text>
);

export default Text;
