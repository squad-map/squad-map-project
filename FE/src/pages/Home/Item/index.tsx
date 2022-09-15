import * as S from './Item.style';

import Text from '@/components/common/Text';
import { IMap } from '@/interfaces/IMap';
import theme from '@/styles/theme';

interface ItemProps {
  item: IMap;
}

const Item = ({ item }: ItemProps) => (
  <S.Item>
    <Text size="xLarge" text={item.emoji} color={theme.color.white} />
    <S.Title>{item.title}</S.Title>
    <S.Description>{item.shareCount}명의 사람들이 공유</S.Description>
    <S.Owner>작성자: {item.owner}</S.Owner>
  </S.Item>
);

export default Item;
