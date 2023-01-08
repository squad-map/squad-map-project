import * as S from './Text.style';

interface TextProps {
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
}: TextProps) => (
  <S.Text size={size} color={color} className={className} {...props}>
    {text}
  </S.Text>
);

export default Text;
