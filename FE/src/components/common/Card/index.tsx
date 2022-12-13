import * as S from './Card.style';

import theme from '@/styles/theme';

interface ICard {
  size: 'small' | 'medium' | 'large';
  color?: string;
  children: React.ReactNode;
}
const Card = ({
  size = 'small',
  color = theme.color.silver,
  children,
}: ICard) => (
  <S.Card size={size} color={color}>
    {children}
  </S.Card>
);

export default Card;
