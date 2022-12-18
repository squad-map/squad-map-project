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
  className?: string;
}

const Text = ({
  text,
  size = 'regular',
  color,
  className,
  ...props
}: IText) => (
  <S.Text size={size} color={color} className={className} {...props}>
    {text}
  </S.Text>
);

export default Text;
