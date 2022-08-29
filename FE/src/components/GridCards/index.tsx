import * as S from './GridCards.style';

interface GridCardsProps {
  size: string;
  children: React.ReactNode;
}

const GridCards = ({ size, children }: GridCardsProps) => (
  <S.GridCards size={size}>{children}</S.GridCards>
);

export default GridCards;
