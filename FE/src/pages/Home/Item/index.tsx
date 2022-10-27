import * as S from './Item.style';

import Text from '@/components/common/Text';
import { IMap } from '@/interfaces/IMap';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: IMap;
}

const Item = ({ item }: ItemProps) => (
  <S.Item>
    <Text
      size="xLarge"
      text={`${unicodeToEmoji(item.map_emoji)}`}
      color={theme.color.white}
    />
    <S.Title>{item.map_name}</S.Title>
    <S.Description>등록된 장소 : {item.places_count}개</S.Description>
    <S.Owner>작성자: {item.host_nickname}</S.Owner>
  </S.Item>
);

export default Item;
